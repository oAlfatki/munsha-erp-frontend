import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { CashAccountResponse } from '@/features/ledger/types/responses/CashAccountResponse';
export type CashAccountListResponse = {
  items: Array<CashAccountResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
