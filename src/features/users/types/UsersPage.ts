import type { UserListItem } from '@/features/users/types/UserListItem';

export interface UsersPage {
  items: UserListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}
