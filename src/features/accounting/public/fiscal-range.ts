import type { FiscalRangeContext } from "@/features/accounting/types/read-models/FiscalRangeContext";
// Frontend read models and display helpers. Authoritative mutations live in server/core.
export function fiscalRange(s: FiscalRangeContext) {
  return { from: `${s.organization.year}-01-01`, to: `${s.organization.year}-12-31` };
}
