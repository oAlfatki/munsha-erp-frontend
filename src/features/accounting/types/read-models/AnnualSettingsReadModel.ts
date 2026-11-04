import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface AnnualSettingsReadModel {
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
  annualBooks?: AnnualBooks;
  invoices: Invoice[];
  stockDocuments?: StockDocument[];
  entries: Entry[];
  branches: Branch[];
  stocks: Stock[];
  extras?: ExtensionData;
  parties: Party[];
  employees: Employee[];
  products: Product[];
  warehouses: Warehouse[];
  movements: Movement[];
}
