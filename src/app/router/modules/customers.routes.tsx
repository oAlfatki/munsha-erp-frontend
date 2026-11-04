import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const CUSTOMERS_ROUTES: RouteObject[] = [
  {
    path: ROUTES.CUSTOMERS,
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CustomerListPage')).default,
    }),
    handle: { module: 'customers', title: '' },
  },
  {
    path: ROUTES.CUSTOMERS_NEW,
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CreateCustomerPage')).default,
    }),
    handle: { module: 'customers', title: '' },
  },
  {
    path: ROUTES.CUSTOMERS_CUSTOMER_BALANCES,
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CustomerBalancesPage')).default,
    }),
    handle: {
      module: 'customers',
      title: 'تقرير حسابات العملاء',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.CUSTOMERS_GROUPS,
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/PartyGroupListPage')).default,
    }),
    handle: {
      module: 'customers',
      title: 'مجموعات العملاء والموردين',
      navModule: 'customers',
    },
  },
];
