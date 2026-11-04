import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { companyQuery } from '@/features/organization/public/company-query';
import type { PriceListReadModel } from '@/features/sales/types/read-models/PriceListReadModel';
import { itemsQuery } from '@/features/stock/public/items-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function usePriceListQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1] = useSuspenseQueries({ queries: [itemsQuery(scope), companyQuery(scope)] });
  const state: PriceListReadModel = {
    products: q0.data.items,
    organization: q1.data,
    extras: { records: {}, operations: [], drafts: {}, preferences: {} },
    annualBooks: { activeId: books.scope.bookId, books: books.items },
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision, 0),
  };
}
