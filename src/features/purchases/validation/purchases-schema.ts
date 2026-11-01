import { invoiceSchema } from '@/features/trade/validation/trade-schema';
export const purchaseInvoiceInputSchema = invoiceSchema.omit({ kind: true });
