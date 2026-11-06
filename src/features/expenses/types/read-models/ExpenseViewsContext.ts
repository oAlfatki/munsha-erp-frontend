import type { Expense, ExpenseDocument, ExtensionData } from '@/features/ledger/public';

export interface ExpenseViewsContext {
  expenseDocuments?: ExpenseDocument[];
  expenses: Expense[];
  extras?: ExtensionData;
}
