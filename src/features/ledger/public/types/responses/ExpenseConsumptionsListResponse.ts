import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ExpenseConsumptionsResponse } from '@/features/ledger/public/types/responses/ExpenseConsumptionsResponse';
export type ExpenseConsumptionsListResponse = {
  items: Array<ExpenseConsumptionsResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
