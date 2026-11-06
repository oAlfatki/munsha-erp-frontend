import { useAuth } from '@/core/auth/AuthProvider';
import { APP_LOCALE } from '@/core/config/locale';
import { fetchDashboard } from '@/features/dashboard/api/read-api';
import { useQuery } from '@tanstack/react-query';

export function useDashboardController() {

  const { user, can } = useAuth();
  const branchId = user?.branchId || '';
  const bookId = '';
  const query = useQuery({
    queryKey: ['erp', 'dashboard', 'summary', user?.userId, 'aspnet', bookId, branchId, APP_LOCALE],

    queryFn: () => fetchDashboard({ branchId }),

    enabled: !!user,
  });
  return {
    can,
    low: query.data?.lowStock || [],
    isLoading: query.isPending,
    error: query.error?.message || '',
  };
}
