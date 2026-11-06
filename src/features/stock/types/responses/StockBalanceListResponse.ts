import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { StockBalanceResponse } from '@/features/stock/types/responses/StockBalanceResponse';

export type StockBalanceListResponse = {
  items: Array<StockBalanceResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
