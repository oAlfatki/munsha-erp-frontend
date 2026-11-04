import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { OpeningAccountBalancesReportReadModel } from '@/features/accounting/types/read-models/OpeningAccountBalancesReportReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { stockDocumentsQuery } from '@/features/stock/public/stock-documents-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useOpeningAccountBalancesReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3] = useSuspenseQueries({
    queries: [
      journalsQuery(scope),
      stockDocumentsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
    ],
  });
  const state: OpeningAccountBalancesReportReadModel = {
    entries: q0.data.items,
    stockDocuments: q1.data.items,
    organization: q2.data,
    branches: q3.data.items,
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
    ),
  };
}
