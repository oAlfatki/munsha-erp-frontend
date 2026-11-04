import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
export interface TransferSettingsPolicyContext{warehouses: Warehouse[];
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
