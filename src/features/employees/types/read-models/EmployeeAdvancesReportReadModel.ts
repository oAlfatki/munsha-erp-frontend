import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Employee } from "@/features/employees/public/types/models/Employee";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Party } from "@/features/parties/public/types/models/Party";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface EmployeeAdvancesReportReadModel {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  extras?: ExtensionData;
  organization: {
    name: string;
    email?: string;
    activity?: string;
    taxNumber?: string;
    registrationNumber?: string;
    address: string;
    phone: string;
    multiBranch: boolean;
    currency: string;
    year: number;
    costPolicy: 'moving_average';
    policyApproved: boolean;
  };
  branches: Branch[];
}
