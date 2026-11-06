import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { ClosingAccountBalancesScreenReadModel } from '@/features/accounting/fiscal-periods/types/read-models/ClosingAccountBalancesScreenReadModel';
import {
  accountsQuery,
  booksQuery,
  cashQuery,
  contactsQuery,
  journalsQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { employeesQuery } from '@/features/personnel/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useClosingAccountBalancesScreenQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      branchesQuery(scope),
      journalsQuery(scope),
      employeesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      contactsQuery(scope),
      accountsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: ClosingAccountBalancesScreenReadModel = {
    organization: q0.data,
    branches: q1.data.items,
    annualBooks: { activeId: books.scope.bookId, books: books.items },
    entries: q2.data.items,
    parties: [...q4.data.items, ...q5.data.items],
    employees: q3.data.items,
    extras: {
      records: {
        contacts: mapMasterRecords(q6.data.items),
        accounts: mapMasterRecords(q7.data.items),
        cash: mapMasterRecords(q8.data.items),
      },
      operations: [],
      drafts: {},
      preferences: {},
    },
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
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
    ),
  };
}
