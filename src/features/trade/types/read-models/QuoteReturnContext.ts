import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface QuoteReturnContext {
products: Product[];
invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
}
