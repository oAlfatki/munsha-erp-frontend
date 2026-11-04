import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ItemGroupResponse } from '@/features/stock/types/responses/ItemGroupResponse';
export type ItemGroupListResponse = {
  items: Array<ItemGroupResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
