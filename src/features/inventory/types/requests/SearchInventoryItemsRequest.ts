export interface SearchInventoryItemsRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  bookId?: string;
  category?: number;
}
