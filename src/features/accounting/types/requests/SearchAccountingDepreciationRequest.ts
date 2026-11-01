export interface SearchAccountingDepreciationRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  period?: string;
  q?: string;
  sourceId?: string;
}
