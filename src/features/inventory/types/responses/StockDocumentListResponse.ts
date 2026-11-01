import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { StockDocumentResponse } from '@/features/inventory/types/responses/StockDocumentResponse';
export type StockDocumentListResponse = {
  items: Array<StockDocumentResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
