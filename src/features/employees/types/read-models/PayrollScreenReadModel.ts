import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PayrollScreenReadModel {
  employees: Employee[];
  branches: Branch[];
  extras?: ExtensionData;
}
