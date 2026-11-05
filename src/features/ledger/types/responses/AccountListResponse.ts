import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { AccountResponse } from '@/features/ledger/types/responses/AccountResponse';
export type AccountListResponse = {
  items: Array<AccountResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
