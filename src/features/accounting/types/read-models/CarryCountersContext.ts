import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface CarryCountersContext {
documentCounters?: Record<string, number>;
invoices: Invoice[];
entries: Entry[];
stockDocuments?: StockDocument[];
}
