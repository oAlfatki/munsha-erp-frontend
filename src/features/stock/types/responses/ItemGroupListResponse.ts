import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ItemGroupResponse } from '@/features/stock/types/responses/ItemGroupResponse';

export type ItemGroupListResponse = {
  items: Array<ItemGroupResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
