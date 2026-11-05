import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface VoucherDetailsControllerReadModel {
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
}
