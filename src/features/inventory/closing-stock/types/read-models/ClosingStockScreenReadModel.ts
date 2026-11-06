import type { AnnualBooks } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Movement, Product, Warehouse } from '@/features/stock/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface ClosingStockScreenReadModel {
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
  warehouses: Warehouse[];
  annualBooks?: AnnualBooks;
  products: Product[];
  movements: Movement[];
}
