import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchAccountingAccounts } from '@/features/ledger/api/accounts-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function accountsQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'accounting',
      'accounts',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchAccountingAccounts(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
