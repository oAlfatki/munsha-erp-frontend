import type { useInventoryController } from '@/features/inventory/stock-balances/hooks/useInventoryController';
export interface StockBalanceHeaderProps {
  model: NonNullable<ReturnType<typeof useInventoryController>>;
}
