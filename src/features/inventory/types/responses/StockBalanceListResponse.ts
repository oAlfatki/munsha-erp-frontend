import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { StockBalanceResponse } from '@/features/inventory/types/responses/StockBalanceResponse';
export type StockBalanceListResponse = {
  items: Array<StockBalanceResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
