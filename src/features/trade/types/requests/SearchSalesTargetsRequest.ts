export interface SearchSalesTargetsRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
  branchId?: string;
  employeeId?: string;
  period?: string;
}
