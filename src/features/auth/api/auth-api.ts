import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { apiClient } from '@/core/api/apiClient';
import type { SaveAuthActionRequest } from '@/features/auth/types/requests/SaveAuthActionRequest';
import type { AuthActionResponse } from '@/features/auth/types/responses/AuthActionResponse';
import type { AuthResponse } from '@/features/auth/types/responses/AuthResponse';
export const fetchAccount = async (): Promise<AuthResponse> =>
  apiClient.get<AuthResponse>(ENDPOINTS.fetchAccount);
export const submitStatus = async (): Promise<unknown> =>
  apiClient.get(ENDPOINTS.submitStatus);
export function authAction(data: SaveAuthActionRequest): Promise<AuthActionResponse> {
  if (CONFIG.apiMode === 'site')
    return apiClient.post<AuthActionResponse>(ENDPOINTS.authAction,data);
  switch(data.action){
 case 'login':return apiClient.post(ENDPOINTS.authLogin,data);
 case 'logout':return apiClient.post(ENDPOINTS.authLogout,data);
 case 'heartbeat':return apiClient.post(ENDPOINTS.authHeartbeat,data);
 case 'changePassword':return apiClient.post(ENDPOINTS.authChangePassword,data);
 case 'revoke':return apiClient.delete(ENDPOINTS.authRevokeSession(data.id));
 case 'revokeOthers':return apiClient.delete(ENDPOINTS.authRevokeOtherSessions);
 case 'create':return apiClient.post(ENDPOINTS.createUser,data);
 case 'update':return apiClient.put(ENDPOINTS.updateUser(data.id),data);
 case 'resetPassword':return apiClient.put(ENDPOINTS.resetUserPassword(data.id),data);
 default:throw new Error('Unsupported authentication action');
 }
}
