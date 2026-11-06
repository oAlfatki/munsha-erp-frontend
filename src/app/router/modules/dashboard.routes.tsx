import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';

export const DASHBOARD_ROUTES: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,

    lazy: async () => ({
      Component: (await import('@/features/dashboard/pages/DashboardPage')).default,
    }),

    handle: { module: 'dashboard', title: '' },
  },
];
