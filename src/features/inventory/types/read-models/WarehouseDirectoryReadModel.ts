import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Warehouse } from '@/features/stock/public/types/models/Warehouse';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface WarehouseDirectoryReadModel {
  warehouses: Warehouse[];
  branches: Branch[];
}
