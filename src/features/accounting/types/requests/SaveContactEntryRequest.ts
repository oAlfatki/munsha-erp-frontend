export type SaveContactEntryRequest = {
  contactId: string;
  date: string;
  branchId: string;
  amount: number;
  counterAccount?: string;
  cashId?: string;
  note: string;
};
