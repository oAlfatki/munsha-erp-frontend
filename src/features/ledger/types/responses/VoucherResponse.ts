export type VoucherResponse = {
  id: string;
  reference: string;
  kind: 'receipt' | 'payment';
  date: string;
  branchId: string;
  partyId: string;
  note: string;
  createdAt: string;
  total: number;
  lines: Array<{
    amount: number;
    currency: string;
    rate: number;
    cashId: string;
    cashAccount: string;
    baseAmount: number;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};
