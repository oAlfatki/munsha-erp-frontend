export interface SearchSuppliersRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
  groupId?: string;
}
