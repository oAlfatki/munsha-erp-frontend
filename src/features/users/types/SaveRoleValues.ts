import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface SaveRoleValues {
  name: string;
  branchId: number;
  permissions: PermissionMask[];
  rowVersion?: string;
}
