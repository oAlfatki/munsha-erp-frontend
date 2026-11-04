import type { Party } from '@/features/parties/public/types/models/Party';
import type { Product } from '@/features/stock/public/types/models/Product';
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
