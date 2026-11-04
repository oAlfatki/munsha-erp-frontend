import { readResponse } from './read-responses';
import type { Page } from '@playwright/test';
import { applyCommand, createSeed } from '../reference/domain/engine';

/** Test-only HTTP boundary. Production contains no seed data, demo identity, or in-browser accounting engine. */
export async function installTestBackend(
  page: Page,
  initialSignedIn = true,
  role: 'admin' | 'staff' | 'viewer' = 'admin',
) {
  let signedIn = initialSignedIn;
  let state = createSeed();
  let revision = 0;
  const receipts = new Map<string, { signature: string; revision: number }>();
  const calls: { method: string; path: string; body: unknown }[] = [];
  let users: import('@/features/users/types/responses/UserResponse').UserResponse[] = [];
  let sessions = [
    {
      id: 'test-session',
      user_id: 'test-user',
      name: 'مستخدم اختبار',
      created_at: Date.now(),
      last_seen: Date.now(),
      user_agent: 'Test browser',
      current: true,
    },
  ];
  let nextFailure: { path: string; status: number; detail: string } | undefined;
  const user = {
    userId: 'test-user',
    displayName: 'مستخدم اختبار',
    fullName: null,
    email: '',
    kind: 'local',
    role,
    mustChange: false,
    sessionId: 'test-session',
  };
  await page.route('**/api/v1/**', async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname.replace('/api/v1', '');
    const method = request.method();
    const body = request.postDataJSON() as Record<string, unknown> | null;
    calls.push({ method, path, body });
    const ok = (data: unknown) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ isSuccess: true, data }),
      });
    const problem = (status: number, detail: string) =>
      route.fulfill({
        status,
        contentType: 'application/problem+json',
        body: JSON.stringify({ status, title: detail, detail }),
      });
    if (nextFailure?.path === path) {
      const failure = nextFailure;
      nextFailure = undefined;
      return problem(failure.status, failure.detail);
    }
    if (path === '/auth/login') {
      if (!body?.username || !body.password) return problem(422, 'Credentials required');
      signedIn = true;
      return ok({ ok: true });
    }
    if (!signedIn) return problem(401, 'Authentication required');
    if (path === '/auth/logout') {
      signedIn = false;
      return ok({ ok: true });
    }
    if (path === '/auth/me')
      return ok({ user, users: user.role === 'admin' ? users : [], sessions });
    if (path === '/auth/heartbeat' && method === 'POST') return ok({ ok: true });
    if (path === '/auth/sessions/others' && method === 'DELETE') {
      sessions = sessions.filter((s) => s.current);
      return ok({ ok: true });
    }
    if (path.startsWith('/auth/sessions/') && method === 'DELETE') {
      const id = decodeURIComponent(path.split('/').at(-1)!);
      sessions = sessions.filter((s) => s.id !== id);
      return ok({ ok: true });
    }
    if (path === '/auth/change-password' && method === 'POST') {
      if (String(body?.password || '').length < 10 || body?.password !== body?.confirm)
        return problem(422, 'Invalid password');
      return ok({ ok: true });
    }
    if (path === '/users' || path.startsWith('/users/')) {
      if (user.role !== 'admin') return problem(403, 'User administration requires admin');
      const id = decodeURIComponent(path.split('/')[2] || '');
      if (method === 'GET' && id) {
        const row = users.find((u) => u.id === id);
        return row ? ok(row) : problem(404, 'User not found');
      }
      if (method === 'GET')
        return ok({
          ...(readResponse(state, '/users') as object),
          items: users,
          pagination: {
            page: 1,
            pageSize: 200,
            totalItems: users.length,
            totalPages: 1,
            hasNextPage: false,
          },
        });
      if (method === 'POST' && path === '/users') {
        if (!body?.name || !body.username || String(body.password || '').length < 10)
          return problem(422, 'Invalid user');
        if (users.some((u) => u.username === body.username))
          return problem(409, 'اسم الدخول مستخدم');
        users.push({
          id: 'user-' + (users.length + 1),
          name: String(body.name),
          username: String(body.username),
          role: body.role as 'staff',
          active: 1,
          must_change: 1,
          created_at: Date.now(),
        });
        return ok({ ok: true });
      }
      const row = users.find((u) => u.id === id);
      if (!row) return problem(404, 'User not found');
      if (method === 'PUT' && path.endsWith('/password')) {
        if (String(body?.password || '').length < 10) return problem(422, 'Invalid password');
        row.must_change = 1;
        sessions = sessions.filter((s) => s.user_id !== id);
        return ok({ ok: true });
      }
      if (method === 'PUT') {
        if (!body?.name) return problem(422, 'Name required');
        Object.assign(row, {
          name: String(body.name),
          role: body.role,
          active: body.active ? 1 : 0,
        });
        return ok({ ok: true });
      }
    }
    if (path === '/workspace') return problem(410, 'Workspace endpoint must not be called');
    if (method === 'GET' && !path.startsWith('/backups')) {
      try {
        return ok(
          readResponse(
            state,
            path,
            Object.fromEntries(new URL(request.url()).searchParams),
            revision,
          ),
        );
      } catch {
        return problem(404, 'Unknown read resource: ' + path);
      }
    }
    if (path === '/backups' && method === 'GET') return ok({ rows: [] });
    if (path.startsWith('/backups/'))
      return ok({ skipped: true, revision, state, createdAt: new Date().toISOString() });
    if (method === 'POST' && path.includes('/commands/')) {
      if (!body) return problem(400, 'Missing command');
      const id = String(body.id);
      const signature = JSON.stringify({ type: body.type, data: body.data });
      const old = receipts.get(id);
      if (old)
        return old.signature === signature
          ? ok({ revision: old.revision })
          : problem(409, 'Request ID reused');
      if (body.revision !== revision) return problem(409, 'Workspace changed');
      try {
        state = applyCommand(state, String(body.type), body.data, {
          id: user.userId,
          name: user.displayName,
        });
        revision++;
        receipts.set(id, { signature, revision });
        return ok({ revision });
      } catch (error) {
        return problem(422, error instanceof Error ? error.message : 'Invalid command');
      }
    }
    return problem(404, 'Unimplemented test route: ' + path);
  });
  return {
    calls,
    getState: () => state,
    getRevision: () => revision,
    getUsers: () => structuredClone(users),
    failNext: (path: string, status: number, detail: string) => {
      nextFailure = { path, status, detail };
    },
  };
}
