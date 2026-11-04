export type SystemSettingsAccountingResponse = {
  multiCurrency: boolean;
  allowNegativeCash: boolean;
  taxEnabled?: boolean;
  taxRate?: number;
  [key: string]: unknown;
};
