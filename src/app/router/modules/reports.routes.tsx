import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const REPORTS_ROUTES: RouteObject[] = [
  {
    path: ROUTES.REPORTS,
    lazy: async () => ({
      Component: (await import('@/features/reports/pages/ReportsPage')).default,
    }),
    handle: { module: 'reports', title: '' },
  },
];
