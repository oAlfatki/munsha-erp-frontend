import { LoadingState } from '@/core/components/shared/feedback/LoadingState';
import { DashboardLayout } from '@/core/layouts/DashboardLayout';
import { ApplicationProvider } from '@/core/providers/ApplicationProvider';
import { CompanyProvider } from '@/core/providers/CompanyProvider';
import { PageScope } from '@/core/router/PageScope';
import { ProtectedRoute } from '@/core/router/ProtectedRoute';
import { RouteErrorPage } from '@/core/router/RouteErrorPage';
import { APP_ROUTES } from '@/core/router/Routes';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
function ApplicationLayout() {
  return (
    <ApplicationProvider>
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
      <a href="/dashboard">العودة إلى لوحة المتابعة</a>
    </main>
  );
}
// Preserve bookmarks from before Browser Router, using the central routes themselves.
if (window.location.hash.length > 1) {
  let target = '/not-found';
  try {
    const key = decodeURIComponent(window.location.hash.slice(1));
    target =
      APP_ROUTES.find((route) => route.handle?.legacyId === key)?.path ||
      (key.startsWith('doc:')
        ? '/documents/' + encodeURIComponent(key.slice(4))
        : key.startsWith('accounts:')
          ? '/accounting/action/' + encodeURIComponent(key.slice(9))
          : '/not-found');
  } catch {}
  window.history.replaceState(window.history.state, '', target);
}
export const APP_ROUTER = createBrowserRouter([
  ...APP_ROUTES.filter((route) => route.path === '/login'),
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
              { index: true, element: <Navigate to="/dashboard" replace /> },
              ...APP_ROUTES.filter((route) => route.path !== '/login'),
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
