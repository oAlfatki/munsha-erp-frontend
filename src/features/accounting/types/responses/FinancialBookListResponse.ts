import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { FinancialBookResponse } from '@/features/accounting/types/responses/FinancialBookResponse';
export type FinancialBookListResponse = {
  items: Array<FinancialBookResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
