export interface SearchReportsPurchasesSummaryRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  from?: string;
  to?: string;
  q?: string;
  partyId?: string;
  currency?: string;
  productId?: string;
}
