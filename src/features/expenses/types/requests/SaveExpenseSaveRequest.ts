export type SaveExpenseSaveRequest = {
  id?: string;
  date: string;
  branchId: string;
  typeId: string;
  treatment: 'current' | 'accrued' | 'prepaid';
  description: string;
  amount: number;
  start: string;
  end: string;
  paid?: number;
  currency?: string;
  rate?: number;
  cashId?: string;
};
