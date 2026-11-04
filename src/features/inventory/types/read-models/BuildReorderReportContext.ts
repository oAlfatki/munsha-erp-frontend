import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
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
