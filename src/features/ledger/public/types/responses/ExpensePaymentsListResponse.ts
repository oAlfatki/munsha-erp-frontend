import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ExpensePaymentsResponse } from '@/features/ledger/public/types/responses/ExpensePaymentsResponse';
export type ExpensePaymentsListResponse = {
  items: Array<ExpensePaymentsResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
