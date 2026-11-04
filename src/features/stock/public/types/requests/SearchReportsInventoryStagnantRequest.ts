export interface SearchReportsInventoryStagnantRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId: string;
  from?: string;
  to?: string;
  q?: string;
  warehouseId?: string;
  productId?: string;
}
