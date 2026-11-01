import { useApplication } from '@/core/providers/ApplicationProvider';
import { useCompanyData } from '@/core/providers/CompanyProvider';
import { fetchDashboard } from '@/features/dashboard/api/read-api';
import { useQuery } from '@tanstack/react-query';
export function useDashboardController() {
  const { branchId, user, navigate } = useApplication();
  const { state, bookId } = useCompanyData();
  const query = useQuery({
    queryKey: ['erp', 'dashboard', 'summary', user?.userId, user?.kind, bookId, branchId],
    queryFn: () => fetchDashboard({ bookId, branchId }),
    enabled: !!state && !!user,
  });
  return {
    navigate,
    low: query.data?.lowStock || [],
    isLoading: query.isPending,
    error: query.error?.message || '',
  };
}
