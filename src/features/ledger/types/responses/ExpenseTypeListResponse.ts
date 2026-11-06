import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ExpenseTypeResponse } from '@/features/ledger/types/responses/ExpenseTypeResponse';

export type ExpenseTypeListResponse = {
  items: Array<ExpenseTypeResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
