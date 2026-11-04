import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Product } from '@/features/stock/public/types/models/Product';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CatalogControllerReadModel {
  products: Product[];
  extras?: ExtensionData;
}
