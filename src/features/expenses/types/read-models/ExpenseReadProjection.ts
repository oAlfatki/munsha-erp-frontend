import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Expense } from '@/features/expenses/types/models/Expense';
import type { ExpenseDocument } from "@/features/expenses/public/types/models/ExpenseDocument";
export interface ExpenseReadProjection{expenses:Expense[];expenseDocuments:ExpenseDocument[];extras:ExtensionData;}
