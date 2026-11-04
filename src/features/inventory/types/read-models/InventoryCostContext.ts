import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
export interface InventoryCostContext {
warehouses: Warehouse[];
movements: Movement[];
products: Product[];
}
