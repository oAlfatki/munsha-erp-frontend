import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
export interface BuildStockAdjustmentsReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  stockDocuments?: StockDocument[];
  extras?: ExtensionData;
}
