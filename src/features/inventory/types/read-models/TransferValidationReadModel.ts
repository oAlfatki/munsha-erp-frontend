import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface TransferValidationReadModel {
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
  invoices: Invoice[];
  warehouses: Warehouse[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  products: Product[];
  movements: Movement[];
  stocks: Stock[];
  branches: Branch[];
}
