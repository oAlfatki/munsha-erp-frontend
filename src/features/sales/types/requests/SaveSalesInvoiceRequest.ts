import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';
export type SaveSalesInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'sale';
};
