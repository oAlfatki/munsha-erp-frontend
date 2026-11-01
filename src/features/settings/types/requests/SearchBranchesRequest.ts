export interface SearchBranchesRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
}
