import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { apiRequest } from '@/core/services/http/api-client';
import type { SaveAuthActionRequest } from '@/features/auth/types/requests/SaveAuthActionRequest';
import type { AuthActionResponse } from '@/features/auth/types/responses/AuthActionResponse';
import type { AuthResponse } from '@/features/auth/types/responses/AuthResponse';
export const fetchAccount = async (): Promise<AuthResponse> =>
  apiRequest<AuthResponse>({
    url: ENDPOINTS.fetchAccount,
    method: 'GET',
  });
export const submitStatus = async (): Promise<Awaited<ReturnType<typeof apiRequest>>> =>
  apiRequest({ url: ENDPOINTS.submitStatus, method: 'GET' });
export function authAction(data: SaveAuthActionRequest): Promise<AuthActionResponse> {
  if (CONFIG.apiMode === 'site')
    return apiRequest({ url: ENDPOINTS.authAction, method: 'POST', data });
  const routes: Record<
    string,
    {
      url: string;
      method: string;
    }
  > = {
    login: { url: ENDPOINTS.authLogin, method: 'POST' },
    logout: { url: ENDPOINTS.authLogout, method: 'POST' },
    heartbeat: { url: ENDPOINTS.authHeartbeat, method: 'POST' },
    changePassword: { url: ENDPOINTS.authChangePassword, method: 'POST' },
    revoke: { url: ENDPOINTS.authRevokeSession(data.id), method: 'DELETE' },
    revokeOthers: { url: ENDPOINTS.authRevokeOtherSessions, method: 'DELETE' },
    create: { url: ENDPOINTS.createUser, method: 'POST' },
    update: { url: ENDPOINTS.updateUser(data.id), method: 'PUT' },
    resetPassword: {
      url: ENDPOINTS.resetUserPassword(data.id),
      method: 'PUT',
    },
  };
  const route = routes[data.action];
  if (!route) throw new Error('Unsupported authentication action');
  const { ...payload } = data;
  return apiRequest({ ...route, ...(route.method === 'DELETE' ? {} : { data: payload }) });
}
