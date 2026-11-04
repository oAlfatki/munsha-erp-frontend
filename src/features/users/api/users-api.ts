import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import type { AuthActionResponse } from '@/features/auth/public/types/responses/AuthActionResponse';
import { fetchUsers, fetchUsersById } from '@/features/users/api/read-api';
import type { IUserFormInput } from '@/features/users/types/IUserFormInput';
export const usersApi = {
  list: fetchUsers,
  detail: fetchUsersById,
  create: (input: IUserFormInput) =>
    apiClient.post<AuthActionResponse>(
      CONFIG.apiMode === 'site' ? ENDPOINTS.authAction : ENDPOINTS.createUser,
      {
        action: 'create',
        name: input.name,
        username: input.username,
        password: input.password,
        role: input.role,
      },
    ),
  update: (input: IUserFormInput & { id: string }) =>
    CONFIG.apiMode === 'site'
      ? apiClient.post<AuthActionResponse>(ENDPOINTS.authAction, {
          action: 'update',
          id: input.id,
          name: input.name,
          role: input.role,
          active: input.active,
        })
      : apiClient.put<AuthActionResponse>(ENDPOINTS.updateUser(input.id), {
          action: 'update',
          id: input.id,
          name: input.name,
          role: input.role,
          active: input.active,
        }),
  resetPassword: (input: { id: string; password: string }) =>
    CONFIG.apiMode === 'site'
      ? apiClient.post<AuthActionResponse>(ENDPOINTS.authAction, {
          action: 'resetPassword',
          ...input,
        })
      : apiClient.put<AuthActionResponse>(ENDPOINTS.resetUserPassword(input.id), {
          action: 'resetPassword',
          ...input,
        }),
};
