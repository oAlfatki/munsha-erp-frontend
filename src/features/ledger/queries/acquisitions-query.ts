import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchAccountingAssetAcquisitions } from '@/features/ledger/api/acquisitions-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function acquisitionsQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'accounting',
      'acquisitions',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchAccountingAssetAcquisitions(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
