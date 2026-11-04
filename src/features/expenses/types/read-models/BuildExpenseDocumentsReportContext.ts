import type { Expense } from '@/features/ledger/public/types/models/Expense';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
export interface BuildExpenseDocumentsReportContext {
  expenses: Expense[];
  extras?: ExtensionData;
}
