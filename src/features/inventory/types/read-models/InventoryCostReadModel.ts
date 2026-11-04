import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InventoryCostReadModel {
  warehouses: Warehouse[];
  products: Product[];
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
  branches: Branch[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  movements: Movement[];
}
