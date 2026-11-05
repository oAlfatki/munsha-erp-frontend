import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { InventoryMovementResponse } from '@/features/stock/types/responses/InventoryMovementResponse';
export type InventoryMovementListResponse = {
  items: Array<InventoryMovementResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
