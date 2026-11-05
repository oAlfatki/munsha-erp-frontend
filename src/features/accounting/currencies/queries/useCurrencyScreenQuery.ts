import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { CurrencyScreenReadModel } from '@/features/accounting/currencies/types/read-models/CurrencyScreenReadModel';
import { booksQuery, currenciesQuery } from '@/features/ledger/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useCurrencyScreenQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0] = useSuspenseQueries({ queries: [currenciesQuery(scope)] });
  const state: CurrencyScreenReadModel = {
    currencies: q0.data.items,
    extras: { records: {}, operations: [], drafts: {}, preferences: {} },
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision),
  };
}
