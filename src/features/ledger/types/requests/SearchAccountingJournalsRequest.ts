export interface SearchAccountingJournalsRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  q?: string;
  accountCode?: string;
  partyId?: string;
  reference?: string;
}
