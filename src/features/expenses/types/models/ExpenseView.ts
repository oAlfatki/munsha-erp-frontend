import type { ExpenseDocument } from '@/features/expenses/types/models/ExpenseDocument';
export interface ExpenseView extends ExpenseDocument {
  legacy?: 'cash' | 'accruedExpense' | 'prepaidExpense';
  paid: number;
  consumed: number;
  due: number;
  remaining: number;
}
