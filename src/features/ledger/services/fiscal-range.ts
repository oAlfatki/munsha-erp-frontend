import type { FiscalRangeContext } from '@/features/ledger/types/read-models/FiscalRangeContext';

// Frontend display calculations; backend authority requires independent verification.

export function fiscalRange(s: FiscalRangeContext) {

  return { from: `${s.organization.year}-01-01`, to: `${s.organization.year}-12-31` };
}
