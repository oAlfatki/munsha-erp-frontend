import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
export interface BuildStockClosingSnapshotReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
