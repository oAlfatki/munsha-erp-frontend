import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
export interface StockDocumentReportContext {
  products: Product[];
  warehouses: Warehouse[];
  parties: Party[];
  extras?: ExtensionData;
}
