import { collection, records } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import {
  fetchSalesInvoices,
  fetchSalesReturns,
  fetchSalesTargets,
} from '@/features/sales/api/read-api';
export const SALE_INVOICES_RESOURCE = collection(
  'sales',
  'saleInvoices',
  fetchSalesInvoices,
  (items) => ({ invoices: items }) as Partial<ErpReadModel>,
);
export const SALE_RETURNS_RESOURCE = collection(
  'sales',
  'saleReturns',
  fetchSalesReturns,
  (items) => ({ invoiceReturns: items }) as Partial<ErpReadModel>,
);
export const SALES_TARGETS_RESOURCE = collection(
  'sales',
  'salesTargets',
  fetchSalesTargets,
  (items) => records('salesTargets', items),
);
