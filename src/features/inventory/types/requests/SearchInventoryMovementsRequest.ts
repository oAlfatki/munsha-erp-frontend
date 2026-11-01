export interface SearchInventoryMovementsRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  branchId?: string;
  warehouseId?: string;
  productId?: string;
  from?: string;
  to?: string;
  reference?: string;
}
