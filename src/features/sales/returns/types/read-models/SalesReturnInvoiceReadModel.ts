import type { AnnualBooks, Entry, ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Product, Stock, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SalesReturnInvoiceReadModel {
  invoices: Invoice[];
  invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
  entries: Entry[];
  parties: Party[];
  products: Product[];
  stocks: Stock[];
  annualBooks?: AnnualBooks;
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
  warehouses: Warehouse[];
  extras?: ExtensionData;
}
