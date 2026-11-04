import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface StockCountScreenReadModel {
  products: Product[];
  warehouses: Warehouse[];
  branches: Branch[];
  extras?: ExtensionData;
}
