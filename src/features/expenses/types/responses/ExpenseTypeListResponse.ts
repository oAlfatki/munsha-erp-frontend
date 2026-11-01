import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ExpenseTypeResponse } from '@/features/expenses/types/responses/ExpenseTypeResponse';
export type ExpenseTypeListResponse = {
  items: Array<ExpenseTypeResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
