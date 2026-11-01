export interface JournalLine {
  currency?: string;
  foreignAmount?: number;
  rate?: number;
  cashId?: string;
  account: string;
  debit: number;
  credit: number;
  partyId?: string;
}
