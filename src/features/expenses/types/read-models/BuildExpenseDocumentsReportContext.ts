import type { Expense, ExtensionData } from '@/features/ledger/public';
export interface BuildExpenseDocumentsReportContext {
  expenses: Expense[];
  extras?: ExtensionData;
}
