import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface RoleAssignmentRequest {
  roleId: number;
  roleVersion: string;
  additionalPermissions: PermissionMask[];
  excludedPermissions: PermissionMask[];
}
