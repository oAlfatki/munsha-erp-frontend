import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { fetchDashboard } from '@/features/dashboard/api/read-api';
import { booksQuery } from '@/features/ledger/public';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function useDashboardController() {

  const { branchId, user, navigate } = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const bookId = books.scope.bookId;
  const query = useQuery({
    queryKey: [
      'erp',
      'dashboard',
      'summary',
      user?.userId,
      'aspnet',
      bookId,
      branchId,
      identity.locale,
    ],

    queryFn: () => fetchDashboard({ bookId, branchId }),

    enabled: !!user,
  });
  return {
    navigate,
    low: query.data?.lowStock || [],
    isLoading: query.isPending,
    error: query.error?.message || '',
  };
}
