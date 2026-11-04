import { invoiceSchema } from "@/features/trade/public/trade-schema";
export const purchaseInvoiceInputSchema = invoiceSchema.omit({ kind: true });
