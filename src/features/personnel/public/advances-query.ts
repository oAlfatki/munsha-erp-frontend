import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/QueryScope';
import { fetchEmployeesAdvances } from '@/features/personnel/public/read-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function advancesQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'employees',
      'advances',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchEmployeesAdvances(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
