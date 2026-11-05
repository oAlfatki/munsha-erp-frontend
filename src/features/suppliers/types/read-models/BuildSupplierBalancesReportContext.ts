import type { Entry } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
export interface BuildSupplierBalancesReportContext {
  entries: Entry[];
  parties: Party[];
}
