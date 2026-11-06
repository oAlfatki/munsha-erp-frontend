import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchInventoryMovements } from '@/features/stock/api/read-api';
import { queryOptions } from '@tanstack/react-query';

/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */

export function movementsQuery(scope: QueryScope) {

  return queryOptions({
    queryKey: [
      'erp',
      'inventory',
      'movements',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],

    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchInventoryMovements(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),

    staleTime: 30000,
  });
}
