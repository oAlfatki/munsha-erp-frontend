import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
export interface BuildCashFlowReportContext {
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
}
