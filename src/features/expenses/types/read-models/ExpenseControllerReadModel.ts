import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { Expense } from '@/features/ledger/public/types/models/Expense';
import type { ExpenseDocument } from '@/features/ledger/public/types/models/ExpenseDocument';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface ExpenseControllerReadModel {
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
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  entries: Entry[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  warehouses: Warehouse[];
  branches: Branch[];
  expenseDocuments?: ExpenseDocument[];
  expenses: Expense[];
}
