import type { useInventoryController } from '@/features/inventory/stock-balances/hooks/useInventoryController';
export interface WarehouseTransferDialogProps {
  model: NonNullable<ReturnType<typeof useInventoryController>>;
}
