export type SaveExpenseConsumeRequest = {
  id: string;
  date: string;
  amount: number;
  period?: string;
  cashId?: string;
  currency?: string;
  rate?: number;
  note?: string;
};
