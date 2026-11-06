import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Product, StockDocument, Warehouse } from '@/features/stock/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface OpeningAccountsReadModel {
  stockDocuments?: StockDocument[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  parties: Party[];
  organization: {
    name: string;
    email?: string;
    activity?: string;
    taxNumber?: string;
    registrationNumber?: string;
    address: string;
    phone: string;
    multiBranch: boolean;
    currency: string;
    year: number;
    costPolicy: 'moving_average';
    policyApproved: boolean;
  };
  extras?: ExtensionData;
  products: Product[];
  warehouses: Warehouse[];
}
