import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Party } from "@/features/parties/public/types/models/Party";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface ImportMastersReadModel {
  products: Product[];
  parties: Party[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
