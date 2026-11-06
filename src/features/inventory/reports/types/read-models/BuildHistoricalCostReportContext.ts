import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Movement, Product, Warehouse } from '@/features/stock/public';

export interface BuildHistoricalCostReportContext {
  warehouses: Warehouse[];
  movements: Movement[];
  parties: Party[];
  employees: Employee[];
  products: Product[];
  extras?: ExtensionData;
}
