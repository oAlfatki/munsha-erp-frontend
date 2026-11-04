import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { VoucherDocument } from '@/features/ledger/public/types/models/VoucherDocument';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Party } from '@/features/parties/public/types/models/Party';
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
