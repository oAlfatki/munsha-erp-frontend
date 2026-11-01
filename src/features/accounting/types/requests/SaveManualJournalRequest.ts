export type SaveManualJournalRequest = {
  date: string;
  branchId: string;
  note: string;
  lines: {
    account: string;
    debit: number;
    credit: number;
  }[];
};
