import type { UserDetails } from '@/features/users/types/UserDetails';

export interface UserEditorProps {
  user?: UserDetails;
  onSaved: () => void;
  onCancel: () => void;
}
