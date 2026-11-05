import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { IncomeStatementControllerReadModel } from '@/features/financial/types/read-models/IncomeStatementControllerReadModel';
import { accountsQuery, booksQuery, mapMasterRecords } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useIncomeStatementControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1] = useSuspenseQueries({ queries: [companyQuery(scope), accountsQuery(scope)] });
  const state: IncomeStatementControllerReadModel = {
    organization: q0.data,
    extras: {
      records: { accounts: mapMasterRecords(q1.data.items) },
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
    revision: Math.max(books.scope.revision, 0, q1.data.scope.revision),
  };
}
