import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { UnitResponse } from '@/features/stock/types/responses/UnitResponse';
export type UnitListResponse = {
  items: Array<UnitResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
