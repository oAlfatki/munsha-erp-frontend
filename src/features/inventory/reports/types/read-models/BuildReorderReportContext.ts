import type { ExtensionData } from '@/features/ledger/public';
import type { PersistedSystemSettings } from '@/features/organization/public';
import type { Movement, Product, Warehouse } from '@/features/stock/public';

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
