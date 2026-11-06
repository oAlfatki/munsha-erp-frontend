import type { Product } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';
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
