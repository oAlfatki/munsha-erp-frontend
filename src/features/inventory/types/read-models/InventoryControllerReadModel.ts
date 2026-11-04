import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Stock } from "@/features/inventory/public/types/models/Stock";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InventoryControllerReadModel {
  warehouses: Warehouse[];
  products: Product[];
  stocks: Stock[];
  movements: Movement[];
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
  branches: Branch[];
}
