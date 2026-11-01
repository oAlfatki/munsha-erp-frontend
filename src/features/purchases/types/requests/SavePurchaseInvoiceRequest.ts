import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';
export type SavePurchaseInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'purchase';
};
