import { afterEach, it, expect } from 'vitest';
import { axiosInstance } from '@/core/api/apiClient';
import { authApi } from '@/features/auth/api/auth-api';
import { usersApi } from '@/features/users/api/users-api';
const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
});
it('uses the adopted Auth/Users verbs and DTOs without retired action or role fields', async () => {
  const calls: unknown[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push([config.method, config.url, config.data ? JSON.parse(config.data) : undefined]);
    return { data: undefined, status: 204, statusText: 'No Content', headers: {}, config };
  };
  await authApi.login({ username: 'test', password: 'password' });
  await authApi.logout();
  await authApi.refresh();
  await authApi.changePassword({ currentPassword: 'old', newPassword: 'new', confirm: 'new' });
  await authApi.revokeSession('c28739a9-6190-4879-a066-4884ef04a00c');
  await authApi.revokeAllSessions();
  const permissions = [{ moduleCode: 'USERS', mask: '1' }];
  await usersApi.create({
    fullName: 'مستخدم',
    username: 'test',
    password: 'password',
    branchId: 1,
    permissions,
  });
  await usersApi.update(7, { fullName: 'الاسم', username: 'test', rowVersion: 'version' });
  await usersApi.resetPassword({ id: 7, newPassword: 'replacement' });
  expect(calls).toEqual([
    ['post', '/auth/sign-in', { username: 'test', password: 'password' }],
    ['post', '/auth/sign-out', {}],
    ['post', '/auth/refresh', {}],
    ['post', '/auth/change-password', { currentPassword: 'old', newPassword: 'new' }],
    ['delete', '/auth/sessions/c28739a9-6190-4879-a066-4884ef04a00c', undefined],
    ['post', '/auth/sessions/revoke-all', {}],
    [
      'post',
      '/users',
      { fullName: 'مستخدم', username: 'test', password: 'password', branchId: 1, permissions },
    ],
    ['put', '/users/7', { fullName: 'الاسم', username: 'test', rowVersion: 'version' }],
    ['post', '/users/7/reset-password', { newPassword: 'replacement' }],
  ]);
});
it('keeps server pagination and filter parameters and does not bulk-load users', async () => {
  const calls: any[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push(config);
    return {
      data: { items: [], page: 3, pageSize: 20, totalCount: 50 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
  const filters = { page: 3, pageSize: 20, search: 'test', branchId: 1, isActive: false };
  await expect(usersApi.list(filters)).resolves.toMatchObject({ page: 3, totalCount: 50 });
  expect(calls).toHaveLength(1);
  expect(calls[0].params).toEqual(filters);
});
it('blocks user changes without a concurrency token or safe identifier', () => {
  expect(() => usersApi.update(1, { fullName: 'a', username: 'a', rowVersion: '' })).toThrow(
    'نسخة',
  );
  expect(() => usersApi.detail(Number.MAX_SAFE_INTEGER + 1)).toThrow('معرّف');
});
