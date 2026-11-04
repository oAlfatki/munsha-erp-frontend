import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const SUPPLIERS_ROUTES: RouteObject[] = [
  {
    path: ROUTES.SUPPLIERS,
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/SupplierListPage')).default,
    }),
    handle: { module: 'suppliers', title: '' },
  },
  {
    path: ROUTES.SUPPLIERS_NEW,
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/CreateSupplierPage')).default,
    }),
    handle: { module: 'suppliers', title: '' },
  },
  {
    path: ROUTES.SUPPLIERS_SUPPLIER_BALANCES,
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/SupplierBalancesPage')).default,
    }),
    handle: {
      module: 'suppliers',
      title: 'تقرير حسابات الموردين',
      navModule: 'accounts',
    },
  },
];
