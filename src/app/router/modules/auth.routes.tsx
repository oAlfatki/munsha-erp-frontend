import { ROUTES } from '@/core/config/navigation-paths';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import type { RouteObject } from 'react-router-dom';

export const AUTH_ROUTES: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    hydrateFallbackElement: <LoadingState />,

    lazy: async () => ({ Component: (await import('@/features/auth/pages/LoginPage')).default }),

    handle: { module: 'auth', title: '' },
  },
];
