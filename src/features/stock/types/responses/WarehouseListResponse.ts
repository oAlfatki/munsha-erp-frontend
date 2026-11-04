import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { WarehouseResponse } from '@/features/stock/types/responses/WarehouseResponse';
export type WarehouseListResponse = {
  items: Array<WarehouseResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
