import type { AnnualBooks, ExtensionData } from '@/features/ledger/public';
import type { PersistedSystemSettings } from '@/features/organization/public';
import type { Warehouse } from '@/features/stock/types/models/Warehouse';
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface StockDocumentValidationReadModel {
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
  annualBooks?: AnnualBooks;
  warehouses: Warehouse[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
}
