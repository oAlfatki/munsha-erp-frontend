import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Employee } from "@/features/employees/public/types/models/Employee";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface BuildEmployeeAdvancesReportContext {
parties: Party[];
employees: Employee[];
products: Product[];
extras?: ExtensionData;
}
