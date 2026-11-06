import type { Page } from '@playwright/test';

/** Test-only HTTP boundary. Production contains no seed data, demo identity, or in-browser accounting engine. */

export async function installTestBackend(
  page: Page,
  initialSignedIn = true,
  hasUserPermissions = true,
) {

  let signedIn = initialSignedIn;
  const calls: { method: string; path: string; body: unknown }[] = [];
  let users: import('@/features/users/types/UserDetails').UserDetails[] = [];
  let sessions = [
    {
      id: 'c28739a9-6190-4879-a066-4884ef04a00c',
      createdAtUtc: '2026-11-01T00:00:00Z',
      expiresAtUtc: '2027-01-01T00:00:00Z',
      lastActivityAtUtc: '2026-11-01T00:00:00Z',
      deviceName: 'جهاز اختبار',
      isCurrent: true,
    },
  ];
  let nextFailure: { path: string; status: number; detail: string } | undefined;
  const codes = [
    'USERS_VIEW',
    'USERS_CREATE',
    'USERS_UPDATE',
    'USERS_STATUS_MANAGE',
    'USERS_PASSWORD_RESET',
    'USERS_PERMISSIONS_VIEW',
    'USERS_PERMISSIONS_MANAGE',
    'USERS_SESSIONS_VIEW',
    'USERS_SESSIONS_REVOKE',
    'USERS_AUDIT_VIEW',
    'USERS_AUDIT_PRINT',
    'USERS_AUDIT_EXPORT',
  ];
  const mask = String((1n << BigInt(codes.length)) - 1n);
  const permissionValues = [{ moduleCode: 'USERS', mask: hasUserPermissions ? mask : '0' }];
  const user = {
    id: 1,
    username: 'test',
    fullName: 'مستخدم اختبار',
    branchId: 1,
    isActive: true,
    permissions: permissionValues,
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

    const raw = (data: unknown, status = 200) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });

    if (path === '/auth/sign-in') {
      if (!body?.username || !body.password) return problem(422, 'بيانات الدخول مطلوبة');
      signedIn = true;
      return raw({ user, session: sessions[0], expiresAtUtc: '2027-01-01T00:00:00Z' });
    }
    if (!signedIn) return problem(401, 'يلزم تسجيل الدخول');
    if (path === '/auth/sign-out') {
      signedIn = false;
      return route.fulfill({ status: 204 });
    }
    if (path === '/auth/me') return raw(user);
    if (path === '/auth/refresh')
      return raw({ expiresAtUtc: '2027-01-01T00:00:00Z', sessionId: sessions[0]?.id });
    if (path === '/auth/change-password')
      return body?.currentPassword && body.newPassword
        ? raw({ code: 'OK', message: 'تم الحفظ' })
        : problem(422, 'كلمة المرور مطلوبة');
    if (path === '/auth/sessions' && method === 'GET')
      return raw({ items: sessions, page: 1, pageSize: 20, totalCount: sessions.length });
    if (path === '/auth/sessions/revoke-all') {
      sessions = [];
      signedIn = false;
      return raw({ revokedCount: 1 });
    }
    if (path.startsWith('/auth/sessions/') && method === 'DELETE') {
      const id = path.split('/').at(-1);
      if (sessions.find((s) => s.id === id)?.isCurrent) signedIn = false;
      sessions = sessions.filter((s) => s.id !== id);
      return route.fulfill({ status: 204 });
    }
    if (path === '/permissions/catalog')
      return raw({
        modules: [
          {
            moduleCode: 'USERS',
            nameAr: 'المستخدمون',
            nameEn: 'Users',
            definitions: codes.map((code, index) => ({
              code,
              bitValue: String(1n << BigInt(index)),
              nameAr: code === 'USERS_VIEW' ? 'عرض المستخدمين' : code,
              nameEn: code,
            })),
          },
        ],
      });
    if (path === '/audit-logs') return raw({ items: [], page: 1, pageSize: 20, totalCount: 0 });
    if (path === '/users' || path.startsWith('/users/')) {
      if (!hasUserPermissions) return problem(403, 'لا تملك الصلاحية');
      const id = Number(path.split('/')[2]);
      const row = users.find((u) => u.id === id);
      if (method === 'POST' && path === '/users') {
        if (!body?.fullName || !body.username || !body.password)
          return problem(422, 'بيانات المستخدم مطلوبة');
        if (users.some((u) => u.username === body.username))
          return problem(409, 'اسم المستخدم مستخدم بالفعل.');
        const created = {
          id: users.length + 2,
          fullName: String(body.fullName),
          username: String(body.username),
          branchId: Number(body.branchId),
          branchName: 'الفرع الرئيسي',
          isActive: true,
          createdAtUtc: new Date().toISOString(),
          updatedAtUtc: null,
        };
        users.push(created);
        return raw({ ...created, rowVersion: 'create-version' }, 201);
      }
      if (path === '/users' && method === 'GET') {
        const params = new URL(request.url()).searchParams;
        const pageNumber = Number(params.get('page') || 1),
          pageSize = Number(params.get('pageSize') || 20);
        const filtered = users.filter(
          (u) =>
            (!params.get('search') || (u.fullName + u.username).includes(params.get('search')!)) &&
            (!params.get('isActive') || String(u.isActive) === params.get('isActive')),
        );
        return raw({
          items: filtered.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
          page: pageNumber,
          pageSize,
          totalCount: filtered.length,
        });
      }
      if (!row) return problem(404, 'المستخدم غير موجود');
      if (path.endsWith('/reset-password') && method === 'POST')
        return body?.newPassword
          ? raw({ code: 'OK', message: 'تم الحفظ' })
          : problem(422, 'كلمة المرور مطلوبة');
      if (path.endsWith('/permissions'))
        return raw({
          userId: id,
          branchId: row.branchId,
          permissions: permissionValues,
          permissionsVersion: 'permission-version',
        });
      if (path.endsWith('/sessions') && method === 'GET')
        return raw({ items: [], page: 1, pageSize: 20, totalCount: 0 });
      if (method === 'GET') return raw(row);
      if (method === 'PUT') return problem(409, 'رمز نسخة البيانات غير متوفر');
    }
    if (path === '/dashboard' && method === 'GET')
      return ok({
        lowStock: [],
        recentAudit: [],
        scope: { bookId: '', branchId: '1', revision: 0 },
      });
    return problem(404, 'Unimplemented test route: ' + path);
  });
  return {
    calls,

    getUsers: () => structuredClone(users),

    seedUsers: (count: number) => {

      users = Array.from({ length: count }, (_, index) => ({
        id: index + 2,
        fullName: 'مستخدم ' + (index + 1),
        username: 'user' + (index + 1),
        branchId: 1,
        branchName: 'الفرع الرئيسي',
        isActive: true,
        createdAtUtc: '2026-11-01T00:00:00Z',
        updatedAtUtc: null,
      }));
    },

    failNext: (path: string, status: number, detail: string) => {

      nextFailure = { path, status, detail };
    },
  };
}
