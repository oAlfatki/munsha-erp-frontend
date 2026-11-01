import { collection } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchPurchasesInvoices, fetchPurchasesReturns } from '@/features/purchases/api/read-api';
export const PURCHASE_INVOICES_RESOURCE = collection(
  'purchases',
  'purchaseInvoices',
  fetchPurchasesInvoices,
  (items) => ({ invoices: items }) as Partial<ErpReadModel>,
);
export const PURCHASE_RETURNS_RESOURCE = collection(
  'purchases',
  'purchaseReturns',
  fetchPurchasesReturns,
  (items) => ({ invoiceReturns: items }) as Partial<ErpReadModel>,
);
