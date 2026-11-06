import { apiClient } from '@/core/api/apiClient';
import type {
  AuditFilters,
  AuditLogsPage,
  CreateUserRequest,
  CreateUserResponse,
  PermissionMask,
  UpdateUserRequest,
  UserDetails,
  UserPermissions,
  UserSessionsPage,
  UsersFilters,
  UsersPage,
} from '@/features/users/type';
const path = (id: number) => {
  if (!Number.isSafeInteger(id) || id < 1) throw Error('معرّف المستخدم غير صحيح.');
  return '/users/' + id;
};
export const usersApi = {
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
