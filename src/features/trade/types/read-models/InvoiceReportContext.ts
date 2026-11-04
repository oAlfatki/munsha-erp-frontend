import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Party } from "@/features/parties/public/types/models/Party";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface InvoiceReportContext {
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
parties: Party[];
warehouses: Warehouse[];
products: Product[];
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
extras?: ExtensionData;
}
