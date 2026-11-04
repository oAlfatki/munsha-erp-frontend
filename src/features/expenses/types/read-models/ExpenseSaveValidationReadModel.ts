import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { ExpenseDocument } from '@/features/ledger/public/types/models/ExpenseDocument';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { PersistedSystemSettings } from '@/features/organization/public/types/models/PersistedSystemSettings';
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface ExpenseSaveValidationReadModel {
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
  expenseDocuments?: ExpenseDocument[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
}
