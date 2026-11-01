import type { JournalLine } from '@/features/accounting/types/models/JournalLine';
export interface Entry {
  id: string;
  reference: string;
  date: string;
  branchId: string;
  description: string;
  lines: JournalLine[];
}
