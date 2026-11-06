import type { Entry } from '@/features/ledger/public';
import type { StockDocument } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
export interface CarryCountersContext {
  documentCounters?: Record<string, number>;
  invoices: Invoice[];
  entries: Entry[];
  stockDocuments?: StockDocument[];
}
