export type AccountResponse = {
  id: string;
  name: string;
  active: boolean;
  code?: string;
  type?: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent?: string;
  postable?: boolean;
  nature?: 'debit' | 'credit';
  [key: string]: string | number | boolean | undefined;
};
