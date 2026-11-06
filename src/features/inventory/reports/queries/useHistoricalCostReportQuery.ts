import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { HistoricalCostReportReadModel } from '@/features/inventory/reports/types/read-models/HistoricalCostReportReadModel';
import { assetsQuery, booksQuery, mapMasterRecords } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { employeesQuery } from '@/features/personnel/public';
import { itemsQuery, movementsQuery, warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useHistoricalCostReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      movementsQuery(scope),
      employeesQuery(scope),
      itemsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      assetsQuery(scope),
    ],
  });
  const state: HistoricalCostReportReadModel = {
    warehouses: q0.data.items,
    movements: q1.data.items,
    parties: [...q6.data.items, ...q7.data.items],
    employees: q2.data.items,
    products: q3.data.items,
    extras: {
      records: { assets: mapMasterRecords(q8.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    organization: q4.data,
    branches: q5.data.items,
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
      q3.data.scope.revision,
      0,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
    ),
  };
}
