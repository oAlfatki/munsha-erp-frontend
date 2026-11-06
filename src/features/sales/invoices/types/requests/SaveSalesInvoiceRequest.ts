import type { SaveInvoiceRequest } from '@/features/trade/public';

export type SaveSalesInvoiceRequest = Omit<SaveInvoiceRequest, 'kind'> & {
  kind: 'sale';
};
