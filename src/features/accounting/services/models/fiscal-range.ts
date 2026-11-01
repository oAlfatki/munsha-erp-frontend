import type {FiscalRangeContext} from '@/features/accounting/types/read-models/FiscalRangeContext';
// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
export function fiscalRange(s: FiscalRangeContext) {
  return { from: `${s.organization.year}-01-01`, to: `${s.organization.year}-12-31` };
}
