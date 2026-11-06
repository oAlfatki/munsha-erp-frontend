import { afterEach, expect, it, vi } from 'vitest';
import { AxiosError } from 'axios';
import { apiClient, axiosInstance } from '@/core/api/apiClient';
import { ApiError } from '@/core/api/apiError';
import {
  advanceSession,
  configureSessionRefresh,
  sessionGeneration,
} from '@/core/api/session-transport';
import { login, getAccount } from '@/features/auth/services/auth-service';
import { loginSchema } from '@/features/auth/validations/auth-schema';
import { loginDestination } from '@/features/auth/services/login-destination';
import { ROUTES } from '@/core/config/navigation-paths';

const original = axiosInstance.defaults.adapter;
const user = {
  id: 7,
  fullName: 'مستخدم الاختبار',
  username: 'test',
  branchId: 2,
  isActive: true,
  permissions: [{ moduleCode: 'USERS', mask: '9223372036854775808' }],
};

const success = (config: any, data: unknown) => ({
  config,
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
});

const fail = (config: any, status: number) =>
  Promise.reject(
    new AxiosError('HTTP failure', undefined, config, undefined, {
      ...success(config, { detail: 'Server internal details' }),
      status,
    }),
  );

afterEach(() => {
  axiosInstance.defaults.adapter = original;
  configureSessionRefresh();
  advanceSession();
  vi.unstubAllGlobals();
});
it('uses the v1.5 sign-in body and maps a bare current user without retaining secrets', async () => {
  const calls: any[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push([config.url, config.data && JSON.parse(config.data)]);
    return success(
      config,
      config.url === '/auth/me'
        ? user
        : {
            user: { ...user, passwordHash: 'secret' },
            session: { id: 'c28739a9-6190-4879-a066-4884ef04a00c' },
            expiresAtUtc: '2027-01-01T00:00:00Z',
          },
    );
  };
  const result = await login({ username: ' test ', password: ' pass ' });
  expect(result.user.userId).toBe('7');
  expect(result.user.permissions[0].mask).toBe('9223372036854775808');
  expect(result.user).not.toHaveProperty('passwordHash');
  expect((await getAccount()).user.userId).toBe('7');
  expect(calls).toEqual([
    ['/auth/sign-in', { username: 'test', password: ' pass ' }],
    ['/auth/me', undefined],
  ]);
});
it('rejects empty credentials and unsafe account identifiers', async () => {
  expect(loginSchema.safeParse({ username: ' ', password: '' }).success).toBe(false);
  axiosInstance.defaults.adapter = async (config) =>
    success(config, { ...user, id: Number.MAX_SAFE_INTEGER + 1 });
  await expect(getAccount()).rejects.toThrow('عقد');
});
it.each([
  undefined,
  'https://example.org',
  '//example.org',
  '/\\evil',
  '/%2fevil',
  '/login?x=1',
  '/%00bad',
  '/%',
])('rejects unsafe destinations %s', (path) => {
  expect(loginDestination(path)).toBe(ROUTES.DASHBOARD);
});
it('preserves a local requested screen', () => {
  expect(loginDestination('/users?search=a')).toBe('/users?search=a');
});
it('does not refresh or expire an existing session on failed sign-in', async () => {
  const refresh = vi.fn();
  configureSessionRefresh(refresh);
  const before = sessionGeneration();
  axiosInstance.defaults.adapter = (config) => fail(config, 401);
  await expect(login({ username: 'test', password: 'bad' })).rejects.toMatchObject({ status: 401 });
  expect(refresh).not.toHaveBeenCalled();
  expect(sessionGeneration()).toBe(before);
});
it('refreshes concurrent expired requests once, then retries them', async () => {
  let refreshed = false;
  const refresh = vi.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
    refreshed = true;
  });
  configureSessionRefresh(refresh);
  axiosInstance.defaults.adapter = async (config) =>
    refreshed ? success(config, { ok: true }) : fail(config, 401);
  await expect(Promise.all([apiClient.get('/one'), apiClient.get('/two')])).resolves.toEqual([
    { ok: true },
    { ok: true },
  ]);
  expect(refresh).toHaveBeenCalledTimes(1);
});
it('ends an expired session once without a refresh loop', async () => {
  const refresh = vi.fn(async () => {
    throw new ApiError({ detail: 'expired' }, 401);
  });
  configureSessionRefresh(refresh);
  const before = sessionGeneration();
  axiosInstance.defaults.adapter = (config) => fail(config, 401);
  await expect(apiClient.get('/private')).rejects.toMatchObject({ status: 401 });
  expect(refresh).toHaveBeenCalledTimes(1);
  expect(sessionGeneration()).toBe(before + 1);
});
it.each([0, 403, 500])('preserves session after refresh failure %s', async (status) => {
  configureSessionRefresh(async () => {
    throw new ApiError({ detail: 'failure' }, status);
  });
  const before = sessionGeneration();
  axiosInstance.defaults.adapter = (config) => fail(config, 401);
  await expect(apiClient.get('/private')).rejects.toMatchObject({ status });
  expect(sessionGeneration()).toBe(before);
});
it.each([0, 403, 500])('does not refresh or expire a request failure %s', async (status) => {
  const refresh = vi.fn();
  configureSessionRefresh(refresh);
  const before = sessionGeneration();
  axiosInstance.defaults.adapter = (config) => fail(config, status);
  await expect(apiClient.get('/private')).rejects.toMatchObject({ status });
  expect(refresh).not.toHaveBeenCalled();
  expect(sessionGeneration()).toBe(before);
});
it('ignores a stale unauthorized response from a previous account', async () => {
  let reject!: () => void;
  axiosInstance.defaults.adapter = (config) =>
    new Promise((_resolve, rejectRequest) => {
      reject = () => {
        void fail(config, 401).catch(rejectRequest);
      };
    });
  const request = apiClient.get('/old');
  await new Promise((resolve) => setTimeout(resolve, 0));
  advanceSession();
  const current = sessionGeneration();
  reject();
  await expect(request).rejects.toMatchObject({ status: 401 });
  expect(sessionGeneration()).toBe(current);
});

it('revokes other sessions using individual documented deletes while preserving the current one', async () => {
  const { revokeOtherSessions } = await import('@/features/auth/services/revoke-other-sessions');
  const deletes: string[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    if (config.method === 'delete') {
      deletes.push(config.url!);
      return { ...success(config, undefined), status: 204 };
    }
    return success(config, {
      items: [
        { id: 'current', isCurrent: true },
        { id: 'other', isCurrent: false },
      ],
      page: 1,
      pageSize: 20,
      totalCount: 2,
    });
  };
  await expect(revokeOtherSessions()).resolves.toEqual({ revokedCount: 1 });
  expect(deletes).toEqual(['/auth/sessions/other']);
});
it('does not delete sessions when the server cannot identify the current one', async () => {
  const { revokeOtherSessions } = await import('@/features/auth/services/revoke-other-sessions');
  const deletes: string[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    if (config.method === 'delete') deletes.push(config.url!);
    return success(config, {
      items: [{ id: 'unknown', isCurrent: false }],
      page: 1,
      pageSize: 20,
      totalCount: 1,
    });
  };
  await expect(revokeOtherSessions()).rejects.toThrow('تحديد الجلسة الحالية');
  expect(deletes).toEqual([]);
});
it('does not let a late refresh failure terminate a newly established account generation', async () => {
  const { authApi } = await import('@/features/auth/api/auth-api');
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  configureSessionRefresh(async (generation) => {
    await gate;
    await authApi.refresh(generation);
  });
  axiosInstance.defaults.adapter = (config) => fail(config, 401);
  const request = apiClient.get('/old-account');
  await new Promise((resolve) => setTimeout(resolve, 0));
  advanceSession();
  const current = sessionGeneration();
  release();
  await expect(request).rejects.toMatchObject({ status: 401 });
  expect(sessionGeneration()).toBe(current);
});
it('discards a successful response belonging to a previous account generation', async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  axiosInstance.defaults.adapter = async (config) => {
    await gate;
    return success(config, { private: 'previous account' });
  };
  const request = apiClient.get('/previous-account');
  await new Promise((resolve) => setTimeout(resolve, 0));
  advanceSession();
  release();
  await expect(request).rejects.toMatchObject({ code: 'ERR_CANCELED' });
});
