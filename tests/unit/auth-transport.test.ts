import { afterEach, it, expect, vi } from 'vitest';
import { axiosInstance } from '@/core/api/apiClient';
import { authApi } from '@/features/auth/api/auth-api';
import { usersApi } from '@/features/users/api/users-api';
const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
  vi.unstubAllGlobals();
});
it('preserves explicit auth and user HTTP operations, body tags and encoded IDs', async () => {
  vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
  const calls: unknown[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push([config.method, config.url, config.data ? JSON.parse(config.data) : undefined]);
    return {
      data: { isSuccess: true, data: { ok: true } },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
  await authApi.login({ username: 'example', password: 'long-password' });
  await authApi.logout();
  await authApi.heartbeat();
  await authApi.changePassword({
    current: 'old-password',
    password: 'new-password',
    confirm: 'new-password',
  });
  await authApi.revokeSession('s/1');
  await authApi.revokeOtherSessions();
  const input = {
    name: 'Example',
    username: 'example',
    password: 'long-password',
    role: 'staff',
    active: true,
  };
  await usersApi.create(input);
  await usersApi.update({ ...input, id: 'u/1' });
  await usersApi.resetPassword({ id: 'u/1', password: 'replacement' });
  expect(calls).toEqual([
    ['post', '/auth/login', { action: 'login', username: 'example', password: 'long-password' }],
    ['post', '/auth/logout', { action: 'logout' }],
    ['post', '/auth/heartbeat', { action: 'heartbeat' }],
    [
      'post',
      '/auth/change-password',
      {
        action: 'changePassword',
        current: 'old-password',
        password: 'new-password',
        confirm: 'new-password',
      },
    ],
    ['delete', '/auth/sessions/s%2F1', undefined],
    ['delete', '/auth/sessions/others', undefined],
    [
      'post',
      '/users',
      {
        action: 'create',
        name: 'Example',
        username: 'example',
        password: 'long-password',
        role: 'staff',
      },
    ],
    [
      'put',
      '/users/u%2F1',
      { action: 'update', id: 'u/1', name: 'Example', role: 'staff', active: true },
    ],
    [
      'put',
      '/users/u%2F1/password',
      { action: 'resetPassword', id: 'u/1', password: 'replacement' },
    ],
  ]);
});
