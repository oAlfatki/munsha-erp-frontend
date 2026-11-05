import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { WarehouseDirectoryReadModel } from '@/features/inventory/warehouses/types/read-models/WarehouseDirectoryReadModel';
import { booksQuery } from '@/features/ledger/public';
import { branchesQuery } from '@/features/organization/public';
import { warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useWarehouseDirectoryQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1] = useSuspenseQueries({ queries: [warehousesQuery(scope), branchesQuery(scope)] });
  const state: WarehouseDirectoryReadModel = { warehouses: q0.data.items, branches: q1.data.items };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision, q1.data.scope.revision),
  };
}
