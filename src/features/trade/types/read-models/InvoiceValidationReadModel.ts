import type { AnnualBooks, Entry, ExtensionData } from '@/features/ledger/public';
import type { PersistedSystemSettings } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Movement, Product, Stock, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InvoiceValidationReadModel {
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
  warehouses: Warehouse[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  parties: Party[];
  movements: Movement[];
  products: Product[];
  stocks: Stock[];
  entries: Entry[];
}
