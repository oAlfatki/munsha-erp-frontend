export type SaveExpenseRequest = {
  date: string;
  branchId: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  rate: number;
};
