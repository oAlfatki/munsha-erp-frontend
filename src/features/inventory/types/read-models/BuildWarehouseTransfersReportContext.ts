import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Movement } from '@/features/stock/public/types/models/Movement';
import type { Product } from '@/features/stock/public/types/models/Product';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
export interface BuildWarehouseTransfersReportContext {
  warehouses: Warehouse[];
  parties: Party[];
  employees: Employee[];
  products: Product[];
  movements: Movement[];
  extras?: ExtensionData;
}
