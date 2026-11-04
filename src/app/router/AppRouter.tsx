import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { CompanyProvider } from '@/app/providers/CompanyProvider';
import { PageScope } from '@/app/router/PageScope';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { APP_ROUTES } from '@/app/router/routes';
import { ROUTES } from '@/core/config/navigation-paths';
import { RouteErrorPage } from '@/core/router/RouteErrorPage';
import { ApplicationProvider } from '@/core/state/ApplicationProvider';
import { authApi, submitStatus } from '@/features/auth/api/auth-api';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
function ApplicationLayout() {
  return (
    <ApplicationProvider heartbeat={() => authApi.heartbeat()} checkSession={submitStatus}>
      <CompanyProvider>
        <DashboardLayout />
      </CompanyProvider>
    </ApplicationProvider>
  );
}
function NotFound() {
  return (
    <main className="empty">
      <h1>الصفحة غير موجودة</h1>
      <a href={ROUTES.DASHBOARD}>العودة إلى لوحة المتابعة</a>
    </main>
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
              { path: '*', element: <NotFound /> },
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
