import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface BuildPurchaseReturnsReportContext {
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
