import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Employee } from "@/features/employees/public/types/models/Employee";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PayrollScreenReadModel {
  employees: Employee[];
  branches: Branch[];
  extras?: ExtensionData;
}
