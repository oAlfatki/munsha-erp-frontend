import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';

export const SALES_ROUTES: RouteObject[] = [
  {
    path: ROUTES.SALES,

    lazy: async () => ({
      Component: (await import('@/features/sales/invoices/pages/SalesInvoiceListPage')).default,
    }),

    handle: { module: 'sales', title: '' },
  },
  {
    path: ROUTES.SALES_NEW,

    lazy: async () => ({
      Component: (await import('@/features/sales/invoices/pages/CreateSalesInvoicePage')).default,
    }),

    handle: { module: 'sales', title: '' },
  },
  {
    path: ROUTES.SALES_SALES_CHART,

    lazy: async () => ({
      Component: (await import('@/features/sales/invoices/pages/SalesChartPage')).default,
    }),

    handle: {
      module: 'sales',
      title: 'الرسم البياني لحركة المبيعات',
      navModule: 'sales',
    },
  },
  {
    path: ROUTES.SALES_SALES_REPORT,

    lazy: async () => ({
      Component: (await import('@/features/sales/invoices/pages/SalesSummaryPage')).default,
    }),

    handle: {
      module: 'sales',
      title: 'تقرير المبيعات',
      navModule: 'sales',
    },
  },
  {
    path: ROUTES.SALES_SALES_RETURNS,

    lazy: async () => ({
      Component: (await import('@/features/sales/returns/pages/SalesReturnsPage')).default,
    }),

    handle: {
      module: 'sales',
      title: 'فاتورة مرتجع مبيعات',
      navModule: 'sales',
    },
  },
  {
    path: ROUTES.SALES_TARGETS,

    lazy: async () => ({
      Component: (await import('@/features/sales/targets/pages/SalesTargetsPage')).default,
    }),

    handle: {
      module: 'sales',
      title: 'أهداف المبيعات ومتابعة الإنجاز',
      navModule: 'sales',
    },
  },
  {
    path: ROUTES.INVENTORY_PRICES,

    lazy: async () => ({
      Component: (await import('@/features/sales/pricing/pages/SalesItemPricingPage')).default,
    }),

    handle: {
      module: 'sales',
      title: 'تسعيرة الأصناف',
      navModule: 'sales',
    },
  },
];
