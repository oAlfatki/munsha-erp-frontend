import type { RoleAssignmentRequest } from '@/features/users/types/RoleAssignmentRequest';

export interface CreateRoleUserRequest extends RoleAssignmentRequest {
  fullName: string;
  username: string;
  password: string;
  branchId: number;
}
