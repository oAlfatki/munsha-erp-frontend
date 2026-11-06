import { useAuth } from '@/core/auth/AuthProvider';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export function PageScope() {

  const { user } = useAuth();
  const { pathname } = useLocation();
  return (
    <div key={pathname + user?.branchId}>
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
