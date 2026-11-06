import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ExpensePaymentsResponse } from '@/features/ledger/types/responses/ExpensePaymentsResponse';

export type ExpensePaymentsListResponse = {
  items: Array<ExpensePaymentsResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
