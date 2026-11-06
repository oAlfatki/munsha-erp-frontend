import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface CreateUserRequest {
  fullName: string;
  username: string;
  password: string;
  branchId: number;
  permissions: PermissionMask[];
}
