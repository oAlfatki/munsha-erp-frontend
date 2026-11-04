import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { VoucherDocument } from '@/features/accounting/types/models/VoucherDocument';
import type { Party } from "@/features/parties/public/types/models/Party";
import type { Branch } from "@/features/settings/public/types/models/Branch";
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
