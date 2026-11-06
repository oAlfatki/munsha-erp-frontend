import type { ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { Movement, Product, Stock, Warehouse } from '@/features/stock/public';
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
