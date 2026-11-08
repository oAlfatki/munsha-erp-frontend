import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { Role } from '@/features/users/types/Role';

export type PermissionAssignment =
  | { mode: 'direct'; permissions: PermissionMask[] }
  | {
      mode: 'role';
      role: Role;
      additionalPermissions: PermissionMask[];
      excludedPermissions: PermissionMask[];
    };
