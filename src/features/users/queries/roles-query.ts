import { fetchPermissionCatalog } from '@/features/users/services/permission-catalog';
import { useAuth } from '@/core/auth/AuthProvider';
import { rolesApi } from '@/features/users/api/roles-api';
import type { RolesFilters } from '@/features/users/types/RolesFilters';
import { useQuery } from '@tanstack/react-query';

export function useRolesQuery(filters: RolesFilters, isEnabled = true) {

  const auth = useAuth();
  const code = filters.assignableOnly ? 'USERS_ROLES_ASSIGN' : 'USERS_ROLES_VIEW';
  const canRead = isEnabled && auth.canFeature('USERS', 'ROLES', code, String(filters.branchId));
  const capability = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    enabled: canRead,
    retry: false,
  });
  const query = useQuery({
    queryKey: ['roles', auth.user?.userId, auth.user?.branchId, filters],

    queryFn: ({ signal }) => rolesApi.list(filters, signal),

    enabled: canRead && capability.data?.capabilities.roles === true,
    retry: false,
  });
  return {
    ...query,
    hasRolesSupport: capability.data?.capabilities.roles,
    capabilityError: capability.error,
  };
}

export function useRoleQuery(id: number) {

  const auth = useAuth();
  const branchId = Number(auth.user?.branchId);
  const canRead =
    Number.isSafeInteger(id) && id > 0 && auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_VIEW');
  const capability = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    enabled: canRead,
    retry: false,
  });
  const query = useQuery({
    queryKey: ['roles', auth.user?.userId, auth.user?.branchId, 'detail', id],

    queryFn: ({ signal }) => rolesApi.detail(id, branchId, signal),

    enabled: canRead && capability.data?.capabilities.roles === true,
    retry: false,
  });
  return {
    ...query,
    hasRolesSupport: capability.data?.capabilities.roles,
    capabilityError: capability.error,
  };
}
