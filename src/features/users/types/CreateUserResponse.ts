import type { UserListItem } from '@/features/users/types/UserListItem';

export interface CreateUserResponse extends UserListItem {
  createdAtUtc: string;
  rowVersion: string;
}
