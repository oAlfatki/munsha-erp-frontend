import type { ExpenseTreatment } from '@/features/ledger/public';
export type IExpenseEditorInput = {
  currency: string;
  rate: number;
  cashId: string;
  id?: string;
  date: string;
  typeId: string;
  treatment: ExpenseTreatment;
  description: string;
  amount: number;
  start: string;
  end: string;
  paid: number;
  branchId: string;
};
