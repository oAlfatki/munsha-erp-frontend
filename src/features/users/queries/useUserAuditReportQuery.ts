import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { auditQuery } from '@/features/users/public/audit-query';
import type { UserAuditReportReadModel } from '@/features/users/types/read-models/UserAuditReportReadModel';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useUserAuditReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2] = useSuspenseQueries({
    queries: [auditQuery(scope), companyQuery(scope), branchesQuery(scope)],
  });
  const state: UserAuditReportReadModel = {
    audit: q0.data.items,
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
