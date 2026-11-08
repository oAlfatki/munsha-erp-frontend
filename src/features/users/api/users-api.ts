import { ApiError } from '@/core/api/apiError';
import type { CreateRoleUserRequest } from '@/features/users/types/CreateRoleUserRequest';
import type { SaveUserAuthorizationRequest } from '@/features/users/types/SaveUserAuthorizationRequest';
import type { UserAuthorization } from '@/features/users/types/UserAuthorization';
import {
  createRoleUserSchema,
  saveUserAuthorizationSchema,
  userAuthorizationSchema,
  roleUserResponseSchema,
} from '@/features/users/validations/roles-schema';
import { apiClient } from '@/core/api/apiClient';
import type { AuditFilters } from '@/features/users/types/AuditFilters';
import type { AuditLogsPage } from '@/features/users/types/AuditLogsPage';
import type { CreateUserRequest } from '@/features/users/types/CreateUserRequest';
import type { CreateUserResponse } from '@/features/users/types/CreateUserResponse';
import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { UpdateUserRequest } from '@/features/users/types/UpdateUserRequest';
import type { UserDetails } from '@/features/users/types/UserDetails';
import type { UserPermissions } from '@/features/users/types/UserPermissions';
import type { UserSessionsPage } from '@/features/users/types/UserSessionsPage';
import type { UsersFilters } from '@/features/users/types/UsersFilters';
import type { UsersPage } from '@/features/users/types/UsersPage';

const path = (id: number) => {

  if (!Number.isSafeInteger(id) || id < 1) throw Error('معرّف المستخدم غير صحيح.');
  return '/users/' + id;
};

export const usersApi = {
  createWithRole: async (input: CreateRoleUserRequest): Promise<CreateUserResponse> => {

    const response = roleUserResponseSchema.parse(
      await apiClient.post<unknown>('/users', createRoleUserSchema.parse(input)),
    );
    if (response.branchId !== input.branchId)
      throw new ApiError({ detail: 'استجابة المستخدم خارج نطاق الفرع المسموح.' }, 403);
    return response;
  },

  authorization: async (id: number, signal?: AbortSignal): Promise<UserAuthorization> => {

    const response = userAuthorizationSchema.parse(
      await apiClient.get<unknown>(path(id) + '/authorization', { signal }),
    );
    if (response.userId !== id)
      throw new ApiError({ detail: 'استجابة صلاحيات المستخدم غير متسقة.' }, 403);
    return response;
  },

  saveAuthorization: async (
    id: number,
    input: SaveUserAuthorizationRequest,
  ): Promise<UserAuthorization> => {

    const response = userAuthorizationSchema.parse(
      await apiClient.put<unknown>(
        path(id) + '/authorization',
        saveUserAuthorizationSchema.parse(input),
      ),
    );
    if (response.userId !== id)
      throw new ApiError({ detail: 'استجابة صلاحيات المستخدم غير متسقة.' }, 403);
    return response;
  },

  sessions: (id: number, page: number, signal?: AbortSignal) =>
    apiClient.get<UserSessionsPage>(path(id) + '/sessions', {
      params: { page, pageSize: 20 },
      signal,
    }),

  revokeSession: (id: number, sessionId: string) =>
    apiClient.delete<void>(path(id) + '/sessions/' + encodeURIComponent(sessionId)),

  revokeAllSessions: (id: number) =>
    apiClient.post<{ revokedCount: number }>(path(id) + '/sessions/revoke-all', {}),

  audit: (params: AuditFilters, signal?: AbortSignal) =>
    apiClient.get<AuditLogsPage>('/audit-logs', { params, signal }),

  auditReport: (kind: 'print' | 'export', filters: AuditFilters) => {

    const { page: _page, pageSize: _pageSize, ...params } = filters;
    return apiClient.post<Blob>(
      '/audit-logs/' + kind,
      { ...params, format: 'pdf' },
      { responseType: 'blob' },
    );
  },

  list: (params: UsersFilters, signal?: AbortSignal) =>
    apiClient.get<UsersPage>('/users', { params, signal }),

  detail: (id: number, signal?: AbortSignal) => apiClient.get<UserDetails>(path(id), { signal }),

  create: (input: CreateUserRequest) =>
    apiClient.post<CreateUserResponse>('/users', {
      fullName: input.fullName,
      username: input.username,
      password: input.password,
      branchId: input.branchId,
      permissions: input.permissions,
    }),

  update: (id: number, input: UpdateUserRequest) => {

    if (!input.rowVersion) throw Error('لا يمكن الحفظ دون رمز نسخة البيانات من الخادم.');
    return apiClient.put<unknown>(path(id), {
      fullName: input.fullName,
      username: input.username,
      rowVersion: input.rowVersion,
    });
  },

  resetPassword: (input: { id: number; newPassword: string }) =>
    apiClient.post<unknown>(path(input.id) + '/reset-password', { newPassword: input.newPassword }),

  permissions: (id: number, signal?: AbortSignal) =>
    apiClient.get<UserPermissions>(path(id) + '/permissions', { signal }),

  savePermissions: (id: number, permissionsVersion: string, permissions: PermissionMask[]) =>
    apiClient.put<UserPermissions>(path(id) + '/permissions', { permissionsVersion, permissions }),
};
