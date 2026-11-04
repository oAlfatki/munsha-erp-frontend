import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { ExpenseDocument } from "@/features/expenses/public/types/models/ExpenseDocument";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
export interface ExpenseSaveSettingsPolicyContext{expenseDocuments?: ExpenseDocument[];
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
systemSettings?: PersistedSystemSettings;}
