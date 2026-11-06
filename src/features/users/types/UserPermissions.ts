import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface UserPermissions {
  userId: number;
  branchId: number;
  permissions: PermissionMask[];
  permissionsVersion: string;
}
