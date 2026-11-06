import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Product } from '@/features/stock/public';

export interface BuildPayrollReportContext {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  extras?: ExtensionData;
}
