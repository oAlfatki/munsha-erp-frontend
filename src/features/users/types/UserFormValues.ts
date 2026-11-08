import type { Role } from '@/features/users/types/Role';
import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface UserFormValues {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  branchId: number;
  permissions: PermissionMask[];
  rowVersion?: string;
  assignmentMode?: 'direct' | 'role';
  role?: Role;
  additionalPermissions?: PermissionMask[];
  excludedPermissions?: PermissionMask[];
}
