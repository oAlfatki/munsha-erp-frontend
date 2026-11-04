import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
export interface BuildOpeningAccountBalancesReportContext {
entries: Entry[];
stockDocuments?: StockDocument[];
}
