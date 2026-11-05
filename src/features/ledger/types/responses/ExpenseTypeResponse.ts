export type ExpenseTypeResponse = {
  id: string;
  name: string;
  active: boolean;
  account?: string;
  [key: string]: string | number | boolean | undefined;
};
