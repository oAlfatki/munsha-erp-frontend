import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SessionResponse } from '@/features/users/types/responses/SessionResponse';
export type SessionListResponse = {
  items: Array<SessionResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
