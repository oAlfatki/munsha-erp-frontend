import type { Movement, Product, Warehouse } from '@/features/stock/public';
export interface BuildStockClosingSnapshotReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
