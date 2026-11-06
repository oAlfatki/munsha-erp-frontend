import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { FinancialBookResponse } from '@/features/ledger/types/responses/FinancialBookResponse';

export type FinancialBookListResponse = {
  items: Array<FinancialBookResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
