import { invoiceSchema } from '@/features/trade/public';
export const purchaseInvoiceInputSchema = invoiceSchema.omit({ kind: true });
