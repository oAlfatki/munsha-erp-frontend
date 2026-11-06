import type { Entry } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SalesSummaryReportReadModel {
  invoices: Invoice[];
  warehouses: Warehouse[];
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
