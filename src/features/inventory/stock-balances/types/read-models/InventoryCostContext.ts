import type { Movement, Product, Warehouse } from '@/features/stock/public';

export interface InventoryCostContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
