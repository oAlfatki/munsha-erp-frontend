import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { UnitCategoryResponse } from '@/features/stock/types/responses/UnitCategoryResponse';
export type UnitCategoryListResponse = {
  items: Array<UnitCategoryResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
