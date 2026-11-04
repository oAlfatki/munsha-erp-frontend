export interface SearchAccountingVouchersRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  reference?: string;
  kind?: 'receipt' | 'payment';
  partyId?: string;
  cashId?: string;
  currency?: string;
}
