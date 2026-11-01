export interface SearchExpensesDocumentsByIdConsumptionsRequest {
  id: string;
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId?: string;
}
