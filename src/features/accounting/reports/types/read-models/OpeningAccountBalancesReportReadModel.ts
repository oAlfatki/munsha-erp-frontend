import type { Entry } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { StockDocument } from '@/features/stock/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface OpeningAccountBalancesReportReadModel {
  entries: Entry[];
  stockDocuments?: StockDocument[];
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
