import type { Entry } from '@/features/ledger/public';
import type { StockDocument } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
import type { Audit } from '@/features/users/public';
export interface ReferencesContext {
  invoices: Invoice[];
  entries: Entry[];
  stockDocuments?: StockDocument[];
  audit: Audit[];
}
