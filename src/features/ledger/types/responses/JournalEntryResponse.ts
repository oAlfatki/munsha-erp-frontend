export type JournalEntryResponse = {
  id: string;
  reference: string;
  date: string;
  branchId: string;
  description: string;
  lines: Array<{
    account: string;
    debit: number;
    credit: number;
    partyId?: string;
    cashId?: string;
    currency?: string;
    foreignAmount?: number;
    rate?: number;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};
