import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ExpenseConsumptionsResponse } from '@/features/ledger/types/responses/ExpenseConsumptionsResponse';
export type ExpenseConsumptionsListResponse = {
  items: Array<ExpenseConsumptionsResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
