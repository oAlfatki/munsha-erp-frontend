import type { PermissionAssignmentDraft } from '@/features/users/types/PermissionAssignmentDraft';
import type { PermissionCatalog } from '@/features/users/types/PermissionCatalog';
import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface PermissionAssignmentEditorProps {
  catalog: PermissionCatalog;
  value: PermissionAssignmentDraft;
  allowed: PermissionMask[];
  onChange: (assignment: PermissionAssignmentDraft) => void;
  canAssignRole: boolean;
  isReadOnly?: boolean;
  isRoleSelectionLocked?: boolean;
}
