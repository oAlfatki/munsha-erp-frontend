import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface AssetDepreciationReportReadModel {
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
