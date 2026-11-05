import type { Entry } from '@/features/ledger/public';
import type { StockDocument } from '@/features/stock/public';
export interface BuildOpeningAccountBalancesReportContext {
  entries: Entry[];
  stockDocuments?: StockDocument[];
}
