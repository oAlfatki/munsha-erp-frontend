import type { ExpenseDocument } from '@/features/ledger/public';
export interface ExpenseView extends ExpenseDocument {
  legacy?: 'cash' | 'accruedExpense' | 'prepaidExpense';
  paid: number;
  consumed: number;
  due: number;
  remaining: number;
}
