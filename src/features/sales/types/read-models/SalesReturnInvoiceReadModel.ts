import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
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
