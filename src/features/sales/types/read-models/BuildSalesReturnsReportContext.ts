import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Employee } from "@/features/employees/public/types/models/Employee";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Party } from "@/features/parties/public/types/models/Party";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface BuildSalesReturnsReportContext {
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
