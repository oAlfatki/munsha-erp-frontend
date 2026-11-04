import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface WarehouseDirectoryReadModel {
  warehouses: Warehouse[];
  branches: Branch[];
}
