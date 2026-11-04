import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/QueryScope';
import { fetchSalesInvoices } from '@/features/trade/public/sales-read-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function saleInvoicesQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'sales',
      'saleInvoices',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchSalesInvoices(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
