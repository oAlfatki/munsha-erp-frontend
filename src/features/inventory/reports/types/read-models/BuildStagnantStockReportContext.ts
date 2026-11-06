import type { Movement, Product, Warehouse } from '@/features/stock/public';

export interface BuildStagnantStockReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
