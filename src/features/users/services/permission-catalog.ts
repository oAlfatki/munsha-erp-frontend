import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/users/api/endpoints';
import { permissionCatalogSchema } from '@/features/users/validations/permission-catalog-schema';

export async function fetchPermissionCatalog(signal?: AbortSignal) {

  return permissionCatalogSchema.parse(
    await apiClient.get<unknown>(ENDPOINTS.fetchPermissionCatalog, { signal }),
  );
}
