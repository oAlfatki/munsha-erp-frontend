import type { ExtensionData } from '@/features/ledger/public';
import type { PersistedSystemSettings } from '@/features/organization/types/models/PersistedSystemSettings';
export interface GeneralSettingsContext {
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
