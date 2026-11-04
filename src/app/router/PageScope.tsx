import { useCompanyData } from '@/app/providers/CompanyProvider';
import { useApplication } from '@/core/state/ApplicationProvider';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
export function PageScope() {
  const { view, branchId, state } = { ...useApplication(), ...useCompanyData() };
  return (
    <div key={view + branchId + state?.organization.year}>
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
