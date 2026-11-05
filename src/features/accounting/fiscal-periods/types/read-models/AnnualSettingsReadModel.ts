import type { AnnualBooks, Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Movement, Product, Stock, StockDocument, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
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
