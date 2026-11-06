import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { AccountStatementReadModel } from '@/features/accounting/accounts/types/read-models/AccountStatementReadModel';
import { booksQuery, journalsQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { purchaseInvoicesQuery, saleInvoicesQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useAccountStatementQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6] = useSuspenseQueries({
    queries: [
      branchesQuery(scope),
      companyQuery(scope),
      journalsQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      saleInvoicesQuery(scope),
      purchaseInvoicesQuery(scope),
    ],
  });
  const state: AccountStatementReadModel = {
    parties: [...q3.data.items, ...q4.data.items],
    branches: q0.data.items,
    organization: q1.data,
    invoices: [...q5.data.items, ...q6.data.items],
    entries: q2.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      q0.data.scope.revision,
      0,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
    ),
  };
}
