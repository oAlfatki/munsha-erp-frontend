import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { WarehouseResponse } from '@/features/stock/types/responses/WarehouseResponse';

export type WarehouseListResponse = {
  items: Array<WarehouseResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
