import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface StockDocumentReportContext {
products: Product[];
warehouses: Warehouse[];
parties: Party[];
extras?: ExtensionData;
}
