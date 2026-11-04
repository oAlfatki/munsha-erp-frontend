import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
import type { Product } from '@/features/stock/public/types/models/Product';
export interface BuildEmployeeAdvancesReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  extras?: ExtensionData;
}
