import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
export interface StockClosingContext {
products: Product[];
warehouses: Warehouse[];
movements: Movement[];
}
