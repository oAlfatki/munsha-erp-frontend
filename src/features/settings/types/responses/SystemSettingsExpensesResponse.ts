export type SystemSettingsExpensesResponse = {
  currency: string;
  requireVoucherNote: boolean;
  maxExpense: number;
  [key: string]: unknown;
};
