import type { Entry, ExtensionData, VoucherDocument } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface VouchersReportReadModel {
  vouchers?: VoucherDocument[];
  parties: Party[];
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
  entries: Entry[];
  branches: Branch[];
}
