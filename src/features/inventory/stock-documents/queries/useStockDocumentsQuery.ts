import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { StockDocumentsReadModel } from '@/features/inventory/stock-documents/types/read-models/StockDocumentsReadModel';
import {
  accountsQuery,
  booksQuery,
  currenciesQuery,
  journalsQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import {
  itemsQuery,
  stockDocumentsQuery,
  stocksQuery,
  warehousesQuery,
} from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useStockDocumentsQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      stockDocumentsQuery(scope),
      itemsQuery(scope),
      stocksQuery(scope),
      journalsQuery(scope),
      branchesQuery(scope),
      currenciesQuery(scope),
      companyQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      accountsQuery(scope),
    ],
  });
  const state: StockDocumentsReadModel = {
    warehouses: q0.data.items,
    stockDocuments: q1.data.items,
    products: q2.data.items,
    stocks: q3.data.items,
    entries: q4.data.items,
    branches: q5.data.items,
    currencies: q6.data.items,
    extras: {
      records: { accounts: mapMasterRecords(q10.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    organization: q7.data,
    parties: [...q8.data.items, ...q9.data.items],
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
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      0,
      q8.data.scope.revision,
      q9.data.scope.revision,
      q10.data.scope.revision,
    ),
  };
}
