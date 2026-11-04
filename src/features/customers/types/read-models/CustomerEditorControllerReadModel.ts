import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CustomerEditorControllerReadModel {
  warehouses: Warehouse[];
  branches: Branch[];
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
