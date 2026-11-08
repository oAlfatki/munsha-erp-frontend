import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { Role } from '@/features/users/types/Role';

export type PermissionAssignmentDraft =
  | { mode: 'direct'; permissions: PermissionMask[] }
  | {
      mode: 'role';
      role: Role | null;
      additionalPermissions: PermissionMask[];
      excludedPermissions: PermissionMask[];
    };
