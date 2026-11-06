export interface SearchExpensesDocumentsRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  reference?: string;
}
