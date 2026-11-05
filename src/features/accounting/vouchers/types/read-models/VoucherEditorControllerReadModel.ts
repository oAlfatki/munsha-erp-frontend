import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Warehouse } from '@/features/stock/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface VoucherEditorControllerReadModel {
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
  warehouses: Warehouse[];
  branches: Branch[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  entries: Entry[];
  parties: Party[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
