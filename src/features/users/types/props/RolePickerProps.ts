import type { Role } from '@/features/users/types/Role';

export interface RolePickerProps {
  value: Role | null;
  onChange: (role: Role | null) => void;
  isReadOnly?: boolean;
}
