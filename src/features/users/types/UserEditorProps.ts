import type { UserResponse } from './responses/UserResponse';
export interface UserEditorProps {
  user?: UserResponse;
  onSaved: () => void;
  onCancel: () => void;
}
