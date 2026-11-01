export type SaveVoucherRequest = {
  kind: 'receipt' | 'payment';
  date: string;
  branchId: string;
  partyId: string;
  note: string;
  amount?: number;
  cashId?: string;
  lines?: {
    amount: number;
    currency: string;
    rate: number;
    cashId: string;
  }[];
};
