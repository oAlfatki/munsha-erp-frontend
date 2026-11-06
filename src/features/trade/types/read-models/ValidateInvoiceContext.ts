import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { PersistedSystemSettings } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Movement, Product, Stock, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';
export interface ValidateInvoiceContext {
  warehouses: Warehouse[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
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
  invoices: Invoice[];
  parties: Party[];
  movements: Movement[];
  products: Product[];
  stocks: Stock[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  entries: Entry[];
}
