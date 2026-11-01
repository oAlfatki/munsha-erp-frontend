import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { UserResponse } from '@/features/users/types/responses/UserResponse';
export type UserListResponse = {
  items: Array<UserResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
