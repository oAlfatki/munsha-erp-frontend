export type SaveContactVoucherRequest = {
  contactId: string;
  date: string;
  branchId: string;
  amount: number;
  counterAccount?: string;
  cashId?: string;
  note: string;
};
