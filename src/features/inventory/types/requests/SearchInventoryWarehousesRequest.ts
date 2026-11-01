export interface SearchInventoryWarehousesRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
  branchId?: string;
}
