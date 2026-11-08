import { ENDPOINTS } from '@/features/users/api/endpoints';
import { apiClient } from '@/core/api/apiClient';
import { ApiError } from '@/core/api/apiError';
import type { Role } from '@/features/users/types/Role';
import type { RolesFilters } from '@/features/users/types/RolesFilters';
import type { RolesPage } from '@/features/users/types/RolesPage';
import type { SaveRoleValues } from '@/features/users/types/SaveRoleValues';
import {
  roleFiltersSchema,
  roleFormSchema,
  roleIdSchema,
  roleSchema,
  rolesPageSchema,
  roleUpdateSchema,
} from '@/features/users/validations/roles-schema';

const rolePath = (id: number) => ENDPOINTS.roles + '/' + roleIdSchema.parse(id);

/** New proposed contract. The backend must implement these routes and permission gates. */
export const rolesApi = {
  list: async (filters: RolesFilters, signal?: AbortSignal): Promise<RolesPage> => {

    const params = roleFiltersSchema.parse(filters);
    const response = rolesPageSchema.parse(
      await apiClient.get<unknown>(ENDPOINTS.roles, { params, signal }),
    );
    if (response.items.some((role) => role.branchId !== params.branchId))
      throw new ApiError({ detail: 'لا يمكن عرض أدوار خارج نطاق الفرع المسموح.' }, 403);
    return response;
  },

  detail: async (id: number, branchId: number, signal?: AbortSignal): Promise<Role> => {

    const response = roleSchema.parse(await apiClient.get<unknown>(rolePath(id), { signal }));
    if (response.id !== id || response.branchId !== branchId)
      throw new ApiError({ detail: 'لا يمكن عرض دور خارج نطاق الفرع المسموح.' }, 403);
    return response;
  },

  create: async (input: SaveRoleValues): Promise<Role> => {

    const { rowVersion: _version, ...body } = roleFormSchema.parse(input);
    const response = roleSchema.parse(await apiClient.post<unknown>(ENDPOINTS.roles, body));
    if (response.branchId !== input.branchId)
      throw new ApiError({ detail: 'استجابة الدور خارج نطاق الفرع المسموح.' }, 403);
    return response;
  },

  update: async (id: number, input: SaveRoleValues): Promise<Role> => {

    const body = roleUpdateSchema.parse(input);
    const response = roleSchema.parse(await apiClient.put<unknown>(rolePath(id), body));
    if (response.id !== id || response.branchId !== input.branchId)
      throw new ApiError({ detail: 'استجابة الدور خارج نطاق الفرع المسموح.' }, 403);
    return response;
  },
};
