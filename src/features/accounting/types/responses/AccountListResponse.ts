import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AccountResponse } from '@/features/accounting/types/responses/AccountResponse';
export type AccountListResponse = {
  items: Array<AccountResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
