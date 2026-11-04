import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
export interface ExtrasContext {
products?: Product[];
extras?: ExtensionData;
}
