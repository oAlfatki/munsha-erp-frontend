import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Product } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';

export interface BuildSalesChartReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
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
  extras?: ExtensionData;
}
