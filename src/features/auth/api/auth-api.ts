import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import type { AuthActionResponse } from '@/features/auth/public/types/responses/AuthActionResponse';
import type { IChangePasswordInput } from '@/features/auth/types/IChangePasswordInput';
import type { LoginRequest } from '@/features/auth/types/requests/LoginRequest';
import type { AuthResponse } from '@/features/auth/types/responses/AuthResponse';
export const fetchAccount = () => apiClient.get<AuthResponse>(ENDPOINTS.fetchAccount);
export const submitStatus = () => apiClient.get<unknown>(ENDPOINTS.submitStatus);
export const authApi = {
  login: (input: LoginRequest) =>
    apiClient.post<AuthActionResponse>(
      CONFIG.apiMode === 'site' ? ENDPOINTS.authAction : ENDPOINTS.authLogin,
      { action: 'login', ...input },
    ),
  logout: () =>
    apiClient.post<AuthActionResponse>(
      CONFIG.apiMode === 'site' ? ENDPOINTS.authAction : ENDPOINTS.authLogout,
      { action: 'logout' },
    ),
  heartbeat: () =>
    apiClient.post<AuthActionResponse>(
      CONFIG.apiMode === 'site' ? ENDPOINTS.authAction : ENDPOINTS.authHeartbeat,
      { action: 'heartbeat' },
    ),
  changePassword: (input: IChangePasswordInput) =>
    apiClient.post<AuthActionResponse>(
      CONFIG.apiMode === 'site' ? ENDPOINTS.authAction : ENDPOINTS.authChangePassword,
      { action: 'changePassword', ...input },
    ),
  revokeSession: (id: string) =>
    CONFIG.apiMode === 'site'
      ? apiClient.post<AuthActionResponse>(ENDPOINTS.authAction, { action: 'revoke', id })
      : apiClient.delete<AuthActionResponse>(ENDPOINTS.authRevokeSession(id)),
  revokeOtherSessions: () =>
    CONFIG.apiMode === 'site'
      ? apiClient.post<AuthActionResponse>(ENDPOINTS.authAction, { action: 'revokeOthers' })
      : apiClient.delete<AuthActionResponse>(ENDPOINTS.authRevokeOtherSessions),
};
