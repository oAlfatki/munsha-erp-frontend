import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface ProfitByItemReportReadModel {
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
  branches: Branch[];
}
