import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SupplierEditorControllerReadModel {
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
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
