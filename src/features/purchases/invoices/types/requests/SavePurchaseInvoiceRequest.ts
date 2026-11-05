import type { SaveInvoiceRequest } from '@/features/trade/public';
export type SavePurchaseInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'purchase';
};
