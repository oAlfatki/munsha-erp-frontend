import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
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
