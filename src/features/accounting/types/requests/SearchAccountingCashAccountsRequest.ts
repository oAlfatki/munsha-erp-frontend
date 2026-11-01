export interface SearchAccountingCashAccountsRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
  branchId?: string;
  currency?: string;
}
