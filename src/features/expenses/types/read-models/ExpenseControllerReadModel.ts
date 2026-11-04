import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Expense } from '@/features/expenses/types/models/Expense';
import type { ExpenseDocument } from "@/features/expenses/public/types/models/ExpenseDocument";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
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
