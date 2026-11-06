import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { StockDocumentResponse } from '@/features/stock/types/responses/StockDocumentResponse';
export type StockDocumentListResponse = {
  items: Array<StockDocumentResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
