import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { AccountingReadModel } from '@/features/accounting/accounts/types/read-models/AccountingReadModel';
import {
  accountsQuery,
  booksQuery,
  journalsQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useAccountingQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2] = useSuspenseQueries({
    queries: [journalsQuery(scope), companyQuery(scope), accountsQuery(scope)],
  });
  const state: AccountingReadModel = {
    entries: q0.data.items,
    organization: q1.data,
    extras: {
      records: { accounts: mapMasterRecords(q2.data.items) },
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
    revision: Math.max(books.scope.revision, q0.data.scope.revision, 0, q2.data.scope.revision),
  };
}
