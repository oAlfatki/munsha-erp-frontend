import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { InvoiceResponse } from '@/features/trade/types/responses/InvoiceResponse';
export type InvoiceListResponse = {
  items: Array<InvoiceResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
