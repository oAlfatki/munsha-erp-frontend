import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface Role {
  id: number;
  name: string;
  branchId: number;
  permissions: PermissionMask[];
  rowVersion: string;
}
