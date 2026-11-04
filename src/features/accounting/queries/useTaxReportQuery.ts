import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { TaxReportReadModel } from '@/features/accounting/types/read-models/TaxReportReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useTaxReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2] = useSuspenseQueries({
    queries: [journalsQuery(scope), companyQuery(scope), branchesQuery(scope)],
  });
  const state: TaxReportReadModel = {
    entries: q0.data.items,
    organization: q1.data,
    branches: q2.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision, 0, q2.data.scope.revision),
  };
}
