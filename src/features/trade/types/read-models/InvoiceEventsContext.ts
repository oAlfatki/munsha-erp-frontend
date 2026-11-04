import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface InvoiceEventsContext {
  invoices: Invoice[];
  entries: Entry[];
  invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
}
