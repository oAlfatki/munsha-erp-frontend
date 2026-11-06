import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Product, Stock, StockDocument, Warehouse } from '@/features/stock/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface StockDocumentsReadModel {
  warehouses: Warehouse[];
  stockDocuments?: StockDocument[];
  products: Product[];
  stocks: Stock[];
  entries: Entry[];
  branches: Branch[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  extras?: ExtensionData;
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
  parties: Party[];
}
