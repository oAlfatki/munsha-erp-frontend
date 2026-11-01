import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ItemResponse } from '@/features/inventory/types/responses/ItemResponse';
export type ItemListResponse = {
  items: Array<ItemResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
