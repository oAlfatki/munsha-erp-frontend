import type { SaveInvoiceRequest } from "@/features/trade/public/types/requests/SaveInvoiceRequest";
export type SavePurchaseInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'purchase';
};
