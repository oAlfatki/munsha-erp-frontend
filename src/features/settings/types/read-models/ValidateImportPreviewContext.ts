import type { Party } from '@/features/parties/public';
import type { Product } from '@/features/stock/public';
export interface ValidateImportPreviewContext {
  products: Product[];
  parties: Party[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
