import { NotFoundPage } from '@/shared/ui/feedback/NotFoundPage';
import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { CompanyProvider } from '@/app/providers/CompanyProvider';
import { PageScope } from '@/app/router/PageScope';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { APP_ROUTES } from '@/app/router/routes';
import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { RouteErrorPage } from '@/core/router/RouteErrorPage';
import { ApplicationProvider } from '@/core/state/ApplicationProvider';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
function ApplicationLayout() {
  const auth = useAuth();
  return (
    <ApplicationProvider checkSession={auth.refreshIdentity}>
      <CompanyProvider>
        <DashboardLayout />
      </CompanyProvider>
    </ApplicationProvider>
  );
}
export const APP_ROUTER = createBrowserRouter([
  ...APP_ROUTES.filter((route) => route.path === ROUTES.LOGIN),
  {
    element: <ProtectedRoute />,
    hydrateFallbackElement: <LoadingState />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <ApplicationLayout />,
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
