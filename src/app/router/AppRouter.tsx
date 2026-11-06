import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { PageScope } from '@/app/router/PageScope';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { APP_ROUTES } from '@/app/router/routes';
import { ROUTES } from '@/core/config/navigation-paths';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { NotFoundPage } from '@/shared/ui/feedback/NotFoundPage';
import { RouteErrorPage } from '@/shared/ui/feedback/RouteErrorPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

export const APP_ROUTER = createBrowserRouter([
  ...APP_ROUTES.filter((route) => route.path === ROUTES.LOGIN),
  {
    element: <ProtectedRoute />,
    hydrateFallbackElement: <LoadingState />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <PageScope />,
            children: [
              { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
              ...APP_ROUTES.filter((route) => route.path !== ROUTES.LOGIN),
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {

  return <RouterProvider router={APP_ROUTER} />;
}
