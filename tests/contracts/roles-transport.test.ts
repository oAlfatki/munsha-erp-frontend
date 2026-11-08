import { afterEach, expect, it } from 'vitest';
import type { InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from '@/core/api/apiClient';
import { rolesApi } from '@/features/users/api/roles-api';
import { usersApi } from '@/features/users/api/users-api';
import {
  loadUserAuthorization,
  saveUserAuthorization,
} from '@/features/users/services/user-authorization';
import type { Role } from '@/features/users/types/Role';

const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
});
const role: Role = {
  id: 7,
  name: 'دور مخصص',
  branchId: 1,
  permissions: [{ moduleCode: 'USERS', mask: '1' }],
  rowVersion: 'role-v1',
};
const authorization = {
  userId: 9,
  branchId: 1,
  permissions: [{ moduleCode: 'USERS', mask: '1' }],
  permissionsVersion: 'user-v1',
  assignment: { mode: 'role' as const, role, additionalPermissions: [], excludedPermissions: [] },
};

const success = (config: InternalAxiosRequestConfig, data: unknown) => ({
  config,
  status: 200,
  statusText: 'OK',
  headers: {},
  data,
});

it('uses bounded role filters and explicit role concurrency tokens', async () => {
  const calls: unknown[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push({
      url: config.url,
      method: config.method,
      params: config.params,
      body: config.data ? JSON.parse(config.data) : undefined,
    });
    return success(
      config,
      config.method === 'get' && config.url === '/roles'
        ? { items: [role], page: 1, pageSize: 20, totalCount: 1 }
        : role,
    );
  };
  await rolesApi.list({ branchId: 1, page: 1, pageSize: 20, assignableOnly: true });
  await rolesApi.create({ name: ' دور مخصص ', branchId: 1, permissions: role.permissions });
  await rolesApi.update(7, {
    name: 'دور مخصص',
    branchId: 1,
    permissions: role.permissions,
    rowVersion: 'role-v1',
  });
  expect(calls).toEqual([
    {
      url: '/roles',
      method: 'get',
      params: { branchId: 1, page: 1, pageSize: 20, assignableOnly: true },
      body: undefined,
    },
    {
      url: '/roles',
      method: 'post',
      params: undefined,
      body: { name: 'دور مخصص', branchId: 1, permissions: role.permissions },
    },
    {
      url: '/roles/7',
      method: 'put',
      params: undefined,
      body: { name: 'دور مخصص', branchId: 1, permissions: role.permissions, rowVersion: 'role-v1' },
    },
  ]);
});
it('rejects invalid identifiers, unbounded requests and missing update versions before network writes', async () => {
  let calls = 0;
  axiosInstance.defaults.adapter = async (config) => {
    calls++;
    return success(config, role);
  };
  await expect(rolesApi.detail(NaN, 1)).rejects.toThrow();
  await expect(rolesApi.list({ page: 1, pageSize: 1000, branchId: 1 })).rejects.toThrow();
  await expect(rolesApi.update(7, { name: 'دور', branchId: 1, permissions: [] })).rejects.toThrow();
  expect(calls).toBe(0);
});
it('rejects foreign role collections, detail identities and acknowledgements', async () => {
  axiosInstance.defaults.adapter = async (config) =>
    success(config, { items: [{ ...role, branchId: 2 }], page: 1, pageSize: 20, totalCount: 1 });
  await expect(rolesApi.list({ page: 1, pageSize: 20, branchId: 1 })).rejects.toMatchObject({
    status: 403,
  });
  axiosInstance.defaults.adapter = async (config) => success(config, { ...role, id: 8 });
  await expect(rolesApi.detail(7, 1)).rejects.toMatchObject({ status: 403 });
  await expect(
    rolesApi.update(7, { name: 'دور', branchId: 1, permissions: [], rowVersion: 'v1' }),
  ).rejects.toMatchObject({ status: 403 });
});
it('creates a role-linked user without flattening inherited permissions into the direct contract', async () => {
  let body: unknown;
  axiosInstance.defaults.adapter = async (config) => {
    body = JSON.parse(config.data);
    return success(config, {
      id: 9,
      fullName: 'Example',
      username: 'example',
      branchId: 1,
      branchName: 'Main',
      isActive: true,
      createdAtUtc: '2026-11-01T00:00:00Z',
      rowVersion: 'user-row-v1',
    });
  };
  await usersApi.createWithRole({
    fullName: 'Example',
    username: 'example',
    password: 'example-only',
    branchId: 1,
    roleId: 7,
    roleVersion: 'role-v1',
    additionalPermissions: [],
    excludedPermissions: [],
  });
  expect(body).toEqual({
    fullName: 'Example',
    username: 'example',
    password: 'example-only',
    branchId: 1,
    roleId: 7,
    roleVersion: 'role-v1',
    additionalPermissions: [],
    excludedPermissions: [],
  });
  expect(body).not.toHaveProperty('permissions');
});
it('preserves the legacy direct-permission resource without speculative roles or v2 requests', async () => {
  const calls: unknown[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push([config.method, config.url, config.data ? JSON.parse(config.data) : undefined]);
    return success(config, {
      userId: 9,
      branchId: 1,
      permissions: role.permissions,
      permissionsVersion: 'v1',
    });
  };
  await expect(loadUserAuthorization(9, 1, false)).resolves.toMatchObject({
    assignment: { mode: 'direct', permissions: role.permissions },
  });
  await saveUserAuthorization(9, 'v1', { mode: 'direct', permissions: role.permissions }, false, 1);
  expect(calls).toEqual([
    ['get', '/users/9/permissions', undefined],
    ['put', '/users/9/permissions', { permissionsVersion: 'v1', permissions: role.permissions }],
  ]);
  await expect(saveUserAuthorization(9, 'v1', authorization.assignment, false, 1)).rejects.toThrow(
    'لم يعلن',
  );
  expect(calls).toHaveLength(2);
});
it('sends role overrides and both concurrency references to the explicit v2 authorization resource', async () => {
  let captured: unknown;
  axiosInstance.defaults.adapter = async (config) => {
    captured = [config.method, config.url, JSON.parse(config.data)];
    return success(config, authorization);
  };
  await saveUserAuthorization(9, 'user-v1', authorization.assignment, true, 1);
  expect(captured).toEqual([
    'put',
    '/users/9/authorization',
    {
      permissionsVersion: 'user-v1',
      assignment: {
        mode: 'role',
        roleId: 7,
        roleVersion: 'role-v1',
        additionalPermissions: [],
        excludedPermissions: [],
      },
    },
  ]);
});
it('rejects foreign v2 identities and branches without falling back to a legacy write', async () => {
  const calls: string[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push(config.url!);
    return success(config, { ...authorization, userId: 10 });
  };
  await expect(loadUserAuthorization(9, 1, true)).rejects.toMatchObject({ status: 403 });
  axiosInstance.defaults.adapter = async (config) => {
    calls.push(config.url!);
    return success(config, {
      ...authorization,
      branchId: 2,
      assignment: { mode: 'direct', permissions: [] },
    });
  };
  await expect(
    saveUserAuthorization(9, 'user-v1', authorization.assignment, true, 1),
  ).rejects.toMatchObject({ status: 403 });
  expect(calls).toEqual(['/users/9/authorization', '/users/9/authorization']);
});
