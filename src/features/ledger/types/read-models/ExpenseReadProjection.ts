import type { Expense } from '@/features/ledger/types/models/Expense';
import type { ExpenseDocument } from '@/features/ledger/types/models/ExpenseDocument';
import type { ExtensionData } from '@/features/ledger/types/models/ExtensionData';
export interface ExpenseReadProjection {
  expenses: Expense[];
  expenseDocuments: ExpenseDocument[];
  extras: ExtensionData;
}
