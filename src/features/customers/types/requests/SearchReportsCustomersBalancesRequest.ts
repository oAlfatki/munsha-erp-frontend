export interface SearchReportsCustomersBalancesRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  q?: string;
  asOf?: string;
  partyId?: string;
}
