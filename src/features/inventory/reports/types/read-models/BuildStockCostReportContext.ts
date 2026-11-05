import type { Movement, Product, Warehouse } from '@/features/stock/public';
export interface BuildStockCostReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
