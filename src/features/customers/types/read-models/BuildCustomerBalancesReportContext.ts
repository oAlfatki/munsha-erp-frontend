import type { Entry } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
export interface BuildCustomerBalancesReportContext {
  entries: Entry[];
  parties: Party[];
}
