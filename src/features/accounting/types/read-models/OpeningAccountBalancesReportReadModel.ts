import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
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
