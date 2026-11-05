import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { InvoiceReturnResponse } from '@/features/trade/types/responses/InvoiceReturnResponse';
export type InvoiceReturnListResponse = {
  items: Array<InvoiceReturnResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
