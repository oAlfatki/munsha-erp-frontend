import type { SaveInvoiceRequest } from '@/features/trade/public/types/requests/SaveInvoiceRequest';
export type SaveSalesInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'sale';
};
