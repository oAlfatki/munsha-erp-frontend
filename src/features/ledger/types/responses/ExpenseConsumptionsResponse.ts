export type ExpenseConsumptionsResponse = {
  reference: string;
  date: string;
  period: string;
  amount: number;
  [key: string]: unknown;
};
