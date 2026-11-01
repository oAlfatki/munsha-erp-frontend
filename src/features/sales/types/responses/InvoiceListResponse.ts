import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { InvoiceResponse } from '@/features/sales/types/responses/InvoiceResponse';
export type InvoiceListResponse = {
  items: Array<InvoiceResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
