import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/auth/api/endpoints';
import type { LoginCredentials } from '@/features/auth/types/LoginCredentials';
import type { PasswordChangeValues } from '@/features/auth/types/PasswordChangeValues';
import type { SessionsPage } from '@/features/auth/types/SessionsPage';
import type { StatusResponse } from '@/features/auth/types/StatusResponse';

export const fetchAccount = (signal?: AbortSignal) =>
  apiClient.get<unknown>(ENDPOINTS.fetchAccount, { signal });

export const authApi = {
  login: (input: LoginCredentials) =>
    apiClient.post<unknown>(ENDPOINTS.authLogin, {
      username: input.username,
      password: input.password,
    }),

  logout: () => apiClient.post<void>(ENDPOINTS.authLogout, {}, { skipSessionRefresh: true }),

  refresh: (generation?: number) =>
    apiClient.post<unknown>(
      ENDPOINTS.authRefresh,
      {},
      { skipSessionRefresh: true, sessionGeneration: generation },
    ),

  changePassword: (input: PasswordChangeValues) =>
    apiClient.post<StatusResponse>(ENDPOINTS.authChangePassword, {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    }),

  sessions: (page = 1, signal?: AbortSignal) =>
    apiClient.get<SessionsPage>(ENDPOINTS.fetchAuthSessions, {
      params: { page, pageSize: 20 },
      signal,
    }),

  revokeSession: (id: string) => apiClient.delete<void>(ENDPOINTS.authRevokeSession(id)),

  revokeAllSessions: () =>
    apiClient.post<{ revokedCount: number }>(ENDPOINTS.authRevokeAllSessions, {}),
};
