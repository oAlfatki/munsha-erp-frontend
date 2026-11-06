import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface UserFormValues {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  branchId: number;
  permissions: PermissionMask[];
  rowVersion?: string;
}
