import { readAllPages } from '@/core/api/readAllPages';
import type { QueryScope } from '@/core/types/QueryScope';
import { fetchExpensesDocuments } from '@/features/ledger/public/expense-read-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function expenseDocumentsQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'expenses',
      'expenseDocuments',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      readAllPages(
        (params) => fetchExpensesDocuments(params, signal),
        { bookId: scope.bookId || undefined },
        signal,
      ),
    staleTime: 30000,
  });
}
