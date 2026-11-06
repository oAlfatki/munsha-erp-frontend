import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { SearchHitResponse } from '@/features/stock/types/responses/SearchHitResponse';
export type SearchHitListResponse = {
  items: Array<SearchHitResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
