import type { Role } from '@/features/users/types/Role';

export interface RoleEditorProps {
  role?: Role;
  onSaved: () => void;
  onCancel: () => void;
}
