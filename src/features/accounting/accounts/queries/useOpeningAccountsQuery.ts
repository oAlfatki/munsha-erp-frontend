import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { OpeningAccountsReadModel } from '@/features/accounting/accounts/types/read-models/OpeningAccountsReadModel';
import {
  accountsQuery,
  booksQuery,
  currenciesQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { itemsQuery, stockDocumentsQuery, warehousesQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useOpeningAccountsQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7] = useSuspenseQueries({
    queries: [
      stockDocumentsQuery(scope),
      currenciesQuery(scope),
      companyQuery(scope),
      itemsQuery(scope),
      warehousesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      accountsQuery(scope),
    ],
  });
  const state: OpeningAccountsReadModel = {
    stockDocuments: q0.data.items,
    currencies: q1.data.items,
    parties: [...q5.data.items, ...q6.data.items],
    organization: q2.data,
    extras: {
      records: { accounts: mapMasterRecords(q7.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    products: q3.data.items,
    warehouses: q4.data.items,
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
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
    ),
  };
}
