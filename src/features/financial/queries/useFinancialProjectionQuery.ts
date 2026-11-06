import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { FinancialProjectionReadModel } from '@/features/financial/types/read-models/FinancialProjectionReadModel';
import { booksQuery, journalsQuery } from '@/features/ledger/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useFinancialProjectionQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0] = useSuspenseQueries({ queries: [journalsQuery(scope)] });
  const state: FinancialProjectionReadModel = { entries: q0.data.items };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision),
  };
}
