import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchPartiesGroups } from '@/features/parties/api/groups-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function partyGroupsQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'parties',
      'partyGroups',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchPartiesGroups(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
