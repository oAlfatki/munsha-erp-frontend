import { ApiError } from '@/core/api/apiError';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
export function ProtectedRoute() {
  const { user, loading: isLoading, error, retry } = useAuth();
  const location = useLocation();
  if (isLoading) return <LoadingState />;
  if (!user && error && !(error instanceof ApiError && error.status === 401))
    return (
      <main className="app-loader">
        <p role="alert">{errorMessage(error)}</p>
        <button onClick={retry}>إعادة المحاولة</button>
      </main>
    );
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
