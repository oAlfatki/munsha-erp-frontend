import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface CarryCountersContext {
  documentCounters?: Record<string, number>;
  invoices: Invoice[];
  entries: Entry[];
  stockDocuments?: StockDocument[];
}
