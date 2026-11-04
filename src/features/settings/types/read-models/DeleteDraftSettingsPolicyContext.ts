import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface DeleteDraftSettingsPolicyContext{invoices: Invoice[];
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
systemSettings?: PersistedSystemSettings;}
