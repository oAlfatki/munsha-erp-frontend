import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { UnitCategoryResponse } from '@/features/stock/types/responses/UnitCategoryResponse';

export type UnitCategoryListResponse = {
  items: Array<UnitCategoryResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
