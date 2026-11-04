import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface TradeSummaryContext {
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
