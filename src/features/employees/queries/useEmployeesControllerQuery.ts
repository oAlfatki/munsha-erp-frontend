import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { EmployeesControllerReadModel } from '@/features/employees/types/read-models/EmployeesControllerReadModel';
import { booksQuery, currenciesQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { employeesQuery } from '@/features/personnel/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useEmployeesControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      employeesQuery(scope),
      branchesQuery(scope),
      currenciesQuery(scope),
    ],
  });
  const state: EmployeesControllerReadModel = {
    organization: q0.data,
    employees: q1.data.items,
    branches: q2.data.items,
    currencies: q3.data.items,
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
    ),
  };
}
