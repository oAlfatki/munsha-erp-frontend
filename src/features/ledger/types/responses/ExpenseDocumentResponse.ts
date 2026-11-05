export type ExpenseDocumentResponse = {
  id: string;
  reference: string;
  date: string;
  branchId: string;
  typeId: string;
  account: string;
  treatment: 'current' | 'accrued' | 'prepaid';
  description: string;
  amount: number;
  start: string;
  end: string;
  currency?: string;
  rate?: number;
  foreignAmount?: number;
  cashId?: string;
  payments: Array<{
    reference: string;
    date: string;
    amount: number;
    foreignAmount?: number;
    currency?: string;
    rate?: number;
    cashId?: string;
    cashAccount?: string;
    [key: string]: unknown;
  }>;
  settlements: Array<{
    reference: string;
    date: string;
    period: string;
    amount: number;
    [key: string]: unknown;
  }>;
  recognitionRefs: Array<string>;
  [key: string]: unknown;
};
