import type { Expense } from '@/features/ledger/public/types/models/Expense';
import type { ExpenseDocument } from '@/features/ledger/public/types/models/ExpenseDocument';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
export interface ExpenseViewsContext {
  expenseDocuments?: ExpenseDocument[];
  expenses: Expense[];
  extras?: ExtensionData;
}
