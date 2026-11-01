import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { InvoiceReturnResponse } from '@/features/sales/types/responses/InvoiceReturnResponse';
export type InvoiceReturnListResponse = {
  items: Array<InvoiceReturnResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
