import type { ExpenseTreatment } from '@/features/expenses/types/models/ExpenseTreatment';
export interface ExpenseDocument {
  currency?: string;
  rate?: number;
  foreignAmount?: number;
  cashId?: string;
  carriedFrom?: number;
  id: string;
  reference: string;
  date: string;
  branchId: string;
  typeId: string;
  account: string;
  treatment: ExpenseTreatment;
  description: string;
  amount: number;
  start: string;
  end: string;
  payments: {
    reference: string;
    date: string;
    amount: number;
    foreignAmount?: number;
    currency?: string;
    rate?: number;
    cashId?: string;
    cashAccount?: string;
  }[];
  settlements: {
    reference: string;
    date: string;
    period: string;
    amount: number;
  }[];
  recognitionRefs: string[];
}
