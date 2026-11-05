import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Employee } from '@/features/personnel/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface EmployeeAdvanceScreenReadModel {
  employees: Employee[];
  branches: Branch[];
  extras?: ExtensionData;
}
