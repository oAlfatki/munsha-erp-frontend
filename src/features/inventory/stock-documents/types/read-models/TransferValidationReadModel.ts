import type { AnnualBooks, ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { Movement, Product, Stock, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
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
