import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Product, Warehouse } from '@/features/stock/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface StockCountScreenReadModel {
  products: Product[];
  warehouses: Warehouse[];
  branches: Branch[];
  extras?: ExtensionData;
}
