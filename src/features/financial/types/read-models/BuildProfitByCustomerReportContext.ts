import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Product } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
export interface BuildProfitByCustomerReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
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
  extras?: ExtensionData;
}
