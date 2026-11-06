import type { ExtensionData } from '@/features/ledger/public';
import type { Product } from '@/features/stock/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface CatalogControllerReadModel {
  products: Product[];
  extras?: ExtensionData;
}
