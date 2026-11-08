import type { PermissionAssignment } from '@/features/users/types/PermissionAssignment';
import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface UserAuthorization {
  userId: number;
  branchId: number;
  permissions: PermissionMask[];
  permissionsVersion: string;
  assignment: PermissionAssignment;
}
