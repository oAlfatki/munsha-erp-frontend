import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface ValidateImportPreviewContext {
products: Product[];
parties: Party[];
currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
