import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
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
