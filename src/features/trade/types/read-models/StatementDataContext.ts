import type { Entry } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
export interface StatementDataContext {
  parties: Party[];
  entries: Entry[];
}
