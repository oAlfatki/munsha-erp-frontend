import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
export interface ValidateInventoryCommandContext {
  products: Product[];
  movements: Movement[];
  warehouses: Warehouse[];
  stocks: Stock[];
  branches: Branch[];
  invoices: { warehouseId?: string }[];
}
