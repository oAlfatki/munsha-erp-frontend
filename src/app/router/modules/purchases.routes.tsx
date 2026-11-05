import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const PURCHASES_ROUTES: RouteObject[] = [
  {
    path: ROUTES.PURCHASES,
    lazy: async () => ({
      Component: (await import('@/features/purchases/invoices/pages/PurchaseInvoiceListPage'))
        .default,
    }),
    handle: { module: 'purchases', title: '' },
  },
  {
    path: ROUTES.PURCHASES_NEW,
    lazy: async () => ({
      Component: (await import('@/features/purchases/invoices/pages/CreatePurchaseInvoicePage'))
        .default,
    }),
    handle: { module: 'purchases', title: '' },
  },
  {
    path: ROUTES.PURCHASES_PURCHASE_REPORT,
    lazy: async () => ({
      Component: (await import('@/features/purchases/invoices/pages/PurchaseSummaryPage')).default,
    }),
    handle: {
      module: 'purchases',
      title: 'تقرير المشتريات',
      navModule: 'purchases',
    },
  },
  {
    path: ROUTES.PURCHASES_PURCHASE_RETURNS,
    lazy: async () => ({
      Component: (await import('@/features/purchases/returns/pages/PurchaseReturnsPage')).default,
    }),
    handle: {
      module: 'purchases',
      title: 'فاتورة مرتجع شراء',
      navModule: 'purchases',
    },
  },
];
