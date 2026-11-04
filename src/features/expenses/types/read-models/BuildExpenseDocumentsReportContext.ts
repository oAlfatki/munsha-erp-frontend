import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Expense } from '@/features/expenses/types/models/Expense';
export interface BuildExpenseDocumentsReportContext {
expenses: Expense[];
extras?: ExtensionData;
}
