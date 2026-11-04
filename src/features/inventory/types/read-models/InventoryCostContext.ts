import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
export interface InventoryCostContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
