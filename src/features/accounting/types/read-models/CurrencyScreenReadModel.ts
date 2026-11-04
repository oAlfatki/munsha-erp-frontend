import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CurrencyScreenReadModel {
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  extras?: ExtensionData;
}
