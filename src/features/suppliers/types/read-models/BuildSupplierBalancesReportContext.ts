import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { Party } from '@/features/parties/public/types/models/Party';
export interface BuildSupplierBalancesReportContext {
  entries: Entry[];
  parties: Party[];
}
