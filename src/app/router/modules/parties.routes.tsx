import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const PARTIES_ROUTES:RouteObject[]=[
{
    path:ROUTES.CUSTOMERS_GROUPS,
    lazy: async () => ({
      Component: (await import('@/features/parties/pages/PartyGroupListPage')).default,
    }),
    handle: {
      module: 'parties',
      title: 'مجموعات العملاء والموردين',
      navModule: 'customers',
    },
  }
];
