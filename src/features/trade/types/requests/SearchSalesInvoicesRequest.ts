export interface SearchSalesInvoicesRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  status?: 'draft' | 'final';
  reference?: string;
  partyId?: string;
  currency?: string;
  payment?: 'cash' | 'credit' | 'mixed';
}
