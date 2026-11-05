import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Product, StockDocument } from '@/features/stock/public';
export interface BuildStockAdjustmentsReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  stockDocuments?: StockDocument[];
  extras?: ExtensionData;
}
