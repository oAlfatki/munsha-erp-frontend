import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Stock } from "@/features/inventory/public/types/models/Stock";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface ValidateInventoryCommandContext {
products: Product[];
movements: Movement[];
warehouses: Warehouse[];
stocks: Stock[];
branches: Branch[];
invoices: Invoice[];
}
