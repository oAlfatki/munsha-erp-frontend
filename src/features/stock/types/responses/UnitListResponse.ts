import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { UnitResponse } from '@/features/stock/types/responses/UnitResponse';
export type UnitListResponse = {
  items: Array<UnitResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
