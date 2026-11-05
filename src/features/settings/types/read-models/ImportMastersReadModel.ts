import type { Party } from '@/features/parties/public';
import type { Product } from '@/features/stock/public';
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
