import type { Branch } from '@/features/organization/public';
import type { Movement } from '@/features/stock/types/models/Movement';
import type { Product } from '@/features/stock/types/models/Product';
import type { Stock } from '@/features/stock/types/models/Stock';
import type { Warehouse } from '@/features/stock/types/models/Warehouse';
export interface ValidateInventoryCommandContext {
  products: Product[];
  movements: Movement[];
  warehouses: Warehouse[];
  stocks: Stock[];
  branches: Branch[];
  invoices: { warehouseId?: string }[];
}
