export interface SearchReportsFinancialProfitByItemRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  from?: string;
  to?: string;
  q?: string;
  productId?: string;
}
