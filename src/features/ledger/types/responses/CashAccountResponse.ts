export type CashAccountResponse = {
  id: string;
  name: string;
  active: boolean;
  code?: string;
  account?: string;
  currency?: string;
  branchId?: string;
  kind?: 'cash' | 'bank';
  [key: string]: string | number | boolean | undefined;
};
