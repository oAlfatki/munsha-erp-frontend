import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { ExpenseDocument } from "@/features/expenses/public/types/models/ExpenseDocument";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
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
