import type { Movement, Product, Warehouse } from '@/features/stock/public';

export interface BuildOpeningStockReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  products: Product[];
}
