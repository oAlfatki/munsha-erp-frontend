import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
export interface SystemSettingsContext {
systemSettings?: PersistedSystemSettings;
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
