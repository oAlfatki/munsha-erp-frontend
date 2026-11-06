import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Product, Stock, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PurchaseInvoiceEditorReadModel {
  parties: Party[];
  invoices: Invoice[];
  branches: Branch[];
  warehouses: Warehouse[];
  products: Product[];
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
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  entries: Entry[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
  stocks: Stock[];
}
