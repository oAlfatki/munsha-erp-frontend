import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchInventoryWarehouses } from '@/features/stock/api/read-api';
import { queryOptions } from '@tanstack/react-query';

/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */

export function warehousesQuery(scope: QueryScope) {

  return queryOptions({
    queryKey: [
      'erp',
      'inventory',
      'warehouses',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],

    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchInventoryWarehouses(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),

    staleTime: 30000,
  });
}
