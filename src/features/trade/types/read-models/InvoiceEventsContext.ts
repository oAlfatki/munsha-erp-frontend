import type { Entry } from '@/features/ledger/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';

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
