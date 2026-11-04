export interface SearchInventoryStockDocumentsRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  bookId?: string;
  branchId?: string;
  from?: string;
  to?: string;
  status?: 'draft' | 'final';
  reference?: string;
  warehouseId?: string;
  kind?: 'opening' | 'transfer' | 'adjustment';
  openingScope?: 'stock' | 'accounts';
}
