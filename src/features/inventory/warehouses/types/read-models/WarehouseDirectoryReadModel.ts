import type { Branch } from '@/features/organization/public';
import type { Warehouse } from '@/features/stock/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface WarehouseDirectoryReadModel {
  warehouses: Warehouse[];
  branches: Branch[];
}
