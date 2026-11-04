import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { AccountPanel } from "@/features/auth/public/AccountPanel";
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Navigate,Outlet,useLocation } from 'react-router-dom';
export function ProtectedRoute() {
  const { user, loading: isLoading, error, retry } = useAuth();
  const location = useLocation();
  if (isLoading) return <LoadingState />;
  if (!user && error && 'status' in error && error.status !== 401)
    return (
      <main className="app-loader">
        <p role="alert">تعذر التحقق من الجلسة</p>
        <button onClick={retry}>إعادة المحاولة</button>
      </main>
    );
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  if (user.mustChange)
    return (
      <main className="password-required">
        <p className="info-note">يجب تغيير كلمة المرور المؤقتة قبل الدخول إلى النظام.</p>
        <AccountPanel user={user} />
      </main>
    );
  return <Outlet />;
}
