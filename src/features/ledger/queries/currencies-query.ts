import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchAccountingCurrencies } from '@/features/ledger/api/currencies-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function currenciesQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'accounting',
      'currencies',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchAccountingCurrencies(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
