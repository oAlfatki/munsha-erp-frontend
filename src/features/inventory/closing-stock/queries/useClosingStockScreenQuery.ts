import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { ClosingStockScreenReadModel } from '@/features/inventory/closing-stock/types/read-models/ClosingStockScreenReadModel';
import { booksQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { itemsQuery, movementsQuery, warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useClosingStockScreenQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      branchesQuery(scope),
      warehousesQuery(scope),
      itemsQuery(scope),
      movementsQuery(scope),
    ],
  });
  const state: ClosingStockScreenReadModel = {
    organization: q0.data,
    branches: q1.data.items,
    warehouses: q2.data.items,
    annualBooks: { activeId: books.scope.bookId, books: books.items },
    products: q3.data.items,
    movements: q4.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      0,
      q1.data.scope.revision,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
    ),
  };
}
