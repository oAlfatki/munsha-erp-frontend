import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Party } from "@/features/parties/public/types/models/Party";
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
