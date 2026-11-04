import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SearchHitResponse } from '@/features/stock/types/responses/SearchHitResponse';
export type SearchHitListResponse = {
  items: Array<SearchHitResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
