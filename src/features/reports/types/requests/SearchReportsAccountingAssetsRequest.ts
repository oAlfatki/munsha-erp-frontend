export interface SearchReportsAccountingAssetsRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  q?: string;
  asOf?: string;
}
