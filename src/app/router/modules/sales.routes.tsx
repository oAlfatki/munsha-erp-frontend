import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const SALES_ROUTES: RouteObject[] = [
  {
    path: ROUTES.SALES,
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesInvoiceListPage')).default,
    }),
    handle: { module: 'sales', title: '' },
  },
  {
    path: ROUTES.SALES_NEW,
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/CreateSalesInvoicePage')).default,
    }),
    handle: { module: 'sales', title: '' },
  },
  {
    path: ROUTES.SALES_SALES_CHART,
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesChartPage')).default,
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
      Component: (await import('@/features/sales/pages/SalesSummaryPage')).default,
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
      Component: (await import('@/features/sales/pages/SalesReturnsPage')).default,
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
      Component: (await import('@/features/sales/pages/SalesTargetsPage')).default,
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
      Component: (await import('@/features/sales/pages/SalesItemPricingPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'تسعيرة الأصناف',
      navModule: 'sales',
    },
  },
];
