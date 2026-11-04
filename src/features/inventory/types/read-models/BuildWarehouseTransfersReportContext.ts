import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Employee } from "@/features/employees/public/types/models/Employee";
import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface BuildWarehouseTransfersReportContext {
warehouses: Warehouse[];
parties: Party[];
employees: Employee[];
products: Product[];
movements: Movement[];
extras?: ExtensionData;
}
