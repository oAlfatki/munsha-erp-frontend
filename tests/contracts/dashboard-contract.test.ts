import { afterEach, expect, it } from 'vitest';
import { axiosInstance } from '@/core/api/apiClient';
import { fetchDashboard } from '@/features/dashboard/api/read-api';
import { canPerform } from '@/core/auth/permissions';

const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
});
it('loads the existing Dashboard projection without fetching other ERP feature collections', async () => {
  const calls: unknown[] = [];
  const response = {
    lowStock: [],
    recentAudit: [],
    scope: { bookId: 'active', branchId: '2', revision: 1 },
  };
  axiosInstance.defaults.adapter = async (config) => {
    calls.push({ url: config.url, params: config.params });
    return {
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data: { isSuccess: true, data: response },
    };
  };
  await expect(fetchDashboard({ branchId: '2' })).resolves.toEqual(response);
  expect(calls).toEqual([{ url: '/dashboard', params: { bookId: undefined, branchId: '2' } }]);
});
it('requires the exact branch and action grant and denies unavailable access', () => {
  const access = {
    status: 'ready' as const,
    grants: [{ module: 'USERS', action: 'USERS_CREATE', branchIds: ['2'] }],
  };
  expect(canPerform(access, 'USERS', 'USERS_CREATE', '2')).toBe(true);
  expect(canPerform(access, 'USERS', 'USERS_CREATE', '3')).toBe(false);
  expect(canPerform(access, 'USERS', 'USERS_VIEW', '2')).toBe(false);
  expect(canPerform(null, 'USERS', 'USERS_CREATE', '2')).toBe(false);
});
