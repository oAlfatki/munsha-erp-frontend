import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type {
  ChangePasswordInput,
  LoginInput,
  SessionsPage,
  StatusResponse,
} from '@/features/auth/type';
export const fetchAccount = (signal?: AbortSignal) =>
  apiClient.get<unknown>(ENDPOINTS.fetchAccount, { signal });
export const authApi = {
  login: (input: LoginInput) =>
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
  changePassword: (input: ChangePasswordInput) =>
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
