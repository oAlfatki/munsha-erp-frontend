import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchPurchasesInvoices } from '@/features/trade/api/purchases-read-api';
import { queryOptions } from '@tanstack/react-query';

/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */

export function purchaseInvoicesQuery(scope: QueryScope) {

  return queryOptions({
    queryKey: [
      'erp',
      'purchases',
      'purchaseInvoices',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],

    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchPurchasesInvoices(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),

    staleTime: 30000,
  });
}
