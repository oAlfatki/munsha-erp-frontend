export interface SearchReportsAccountingForeignCurrencyRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  from?: string;
  to?: string;
  q?: string;
  currency?: string;
}
