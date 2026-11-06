import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Product, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface InvoiceDetailsReadModel {
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
  warehouses: Warehouse[];
  products: Product[];
  invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
  invoices: Invoice[];
  extras?: ExtensionData;
}
