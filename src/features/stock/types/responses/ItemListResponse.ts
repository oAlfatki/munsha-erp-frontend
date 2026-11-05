import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ItemResponse } from '@/features/stock/types/responses/ItemResponse';
export type ItemListResponse = {
  items: Array<ItemResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
