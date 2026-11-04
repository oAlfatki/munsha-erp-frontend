import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
export interface BuildReorderReportContext {
warehouses: Warehouse[];
movements: Movement[];
products: Product[];
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
