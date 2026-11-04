import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
import type { Audit } from '@/features/users/public/types/models/Audit';
export interface ReferencesContext {
  invoices: Invoice[];
  entries: Entry[];
  stockDocuments?: StockDocument[];
  audit: Audit[];
}
