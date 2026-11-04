import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
export interface InvoiceSettingsPolicyContext {
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
  systemSettings?: PersistedSystemSettings;
}
