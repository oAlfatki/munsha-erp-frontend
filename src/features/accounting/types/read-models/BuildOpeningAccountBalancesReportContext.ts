import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
export interface BuildOpeningAccountBalancesReportContext {
  entries: Entry[];
  stockDocuments?: StockDocument[];
}
