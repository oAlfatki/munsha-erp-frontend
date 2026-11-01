import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { InventoryMovementResponse } from '@/features/inventory/types/responses/InventoryMovementResponse';
export type InventoryMovementListResponse = {
  items: Array<InventoryMovementResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
