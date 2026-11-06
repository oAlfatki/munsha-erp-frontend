import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchBranches } from '@/features/organization/api/read-api';
import { queryOptions } from '@tanstack/react-query';

/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */

export function branchesQuery(scope: QueryScope) {

  return queryOptions({
    queryKey: [
      'erp',
      'settings',
      'branches',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],

    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchBranches(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),

    staleTime: 30000,
  });
}
