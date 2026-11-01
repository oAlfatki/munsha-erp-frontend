import { useApplication } from '@/core/providers/ApplicationProvider';
import { useCompanyData } from '@/core/providers/CompanyProvider';
import { Outlet } from 'react-router-dom';
export function PageScope() {
  const { view, branchId, state } = { ...useApplication(), ...useCompanyData() };
  return (
    <div key={view + branchId + state?.organization.year}>
      <Outlet />
    </div>
  );
}
