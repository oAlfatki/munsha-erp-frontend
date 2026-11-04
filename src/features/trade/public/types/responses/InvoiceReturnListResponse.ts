import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { InvoiceReturnResponse } from '@/features/trade/public/types/responses/InvoiceReturnResponse';
export type InvoiceReturnListResponse = {
  items: Array<InvoiceReturnResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
