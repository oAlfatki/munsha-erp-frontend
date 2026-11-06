import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Product } from '@/features/stock/types/models/Product';
import type { Warehouse } from '@/features/stock/types/models/Warehouse';

export interface StockDocumentReportContext {
  products: Product[];
  warehouses: Warehouse[];
  parties: Party[];
  extras?: ExtensionData;
}
