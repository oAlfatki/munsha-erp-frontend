import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { InventoryCostReadModel } from '@/features/inventory/stock-balances/types/read-models/InventoryCostReadModel';
import { booksQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery, systemQuery } from '@/features/organization/public';
import { itemsQuery, movementsQuery, warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useInventoryCostQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      itemsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      systemQuery(scope),
      movementsQuery(scope),
    ],
  });
  const state: InventoryCostReadModel = {
    warehouses: q0.data.items,
    products: q1.data.items,
    organization: q2.data,
    branches: q3.data.items,
    systemSettings: q4.data,
    extras: {
      records: {},
      operations: [],
      drafts: {},
      preferences: {
        defaultProfit: String(q4.data.inventory.profit),
        defaultDiscount: String(q4.data.inventory.discount),
        defaultPrice: q4.data.sales.defaultPrice,
      },
    },
    movements: q5.data.items,
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
      0,
      q3.data.scope.revision,
      0,
      q5.data.scope.revision,
    ),
  };
}
