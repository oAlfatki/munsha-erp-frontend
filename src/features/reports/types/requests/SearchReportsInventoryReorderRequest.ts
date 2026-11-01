export interface SearchReportsInventoryReorderRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  q?: string;
  asOf?: string;
  warehouseId?: string;
  productId?: string;
}
