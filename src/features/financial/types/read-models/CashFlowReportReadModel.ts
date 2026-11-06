import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface CashFlowReportReadModel {
  entries: Entry[];
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
  branches: Branch[];
}
