import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CatalogControllerReadModel {
  products: Product[];
  extras?: ExtensionData;
}
