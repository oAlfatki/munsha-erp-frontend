export type ExpensePaymentsResponse = {
  reference: string;
  date: string;
  amount: number;
  foreignAmount?: number;
  currency?: string;
  rate?: number;
  cashId?: string;
  cashAccount?: string;
  [key: string]: unknown;
};
