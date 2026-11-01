export interface SearchReportsFinancialAccountMappingRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  q?: string;
  asOf?: string;
  accountCode?: string;
}
