import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/types/models/Branch';
import type { PersistedSystemSettings } from '@/features/organization/types/models/PersistedSystemSettings';

export interface OperationCashIdContext {
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
  warehouses: { id: string; branchId: string; active: boolean }[];
  branches: Branch[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
}
