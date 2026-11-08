import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { RoleAssignmentRequest } from '@/features/users/types/RoleAssignmentRequest';

export interface SaveUserAuthorizationRequest {
  permissionsVersion: string;
  assignment:
    | { mode: 'direct'; permissions: PermissionMask[] }
    | ({ mode: 'role' } & RoleAssignmentRequest);
}
