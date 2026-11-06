import type { UserListItem } from '@/features/users/types/UserListItem';

export interface UserDetails extends UserListItem {
  createdAtUtc: string;
  updatedAtUtc: string | null;
}
