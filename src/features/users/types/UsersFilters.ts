export interface UsersFilters {
  page: number;
  pageSize: number;
  search: string;
  isActive?: boolean;
  branchId?: number;
}
