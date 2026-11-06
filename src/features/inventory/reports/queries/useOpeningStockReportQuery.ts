import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { OpeningStockReportReadModel } from '@/features/inventory/reports/types/read-models/OpeningStockReportReadModel';
import { booksQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { itemsQuery, movementsQuery, warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useOpeningStockReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      movementsQuery(scope),
      itemsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
    ],
  });
  const state: OpeningStockReportReadModel = {
    warehouses: q0.data.items,
    movements: q1.data.items,
    products: q2.data.items,
    organization: q3.data,
    branches: q4.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      q0.data.scope.revision,
      q1.data.scope.revision,
      q2.data.scope.revision,
      0,
      q4.data.scope.revision,
    ),
  };
}
