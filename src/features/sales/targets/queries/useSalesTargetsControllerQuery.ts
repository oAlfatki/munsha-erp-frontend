import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery, journalsQuery, mapMasterRecords } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { employeesQuery } from '@/features/personnel/public';
import { salesTargetsQuery } from '@/features/sales/targets/queries/sales-targets-query';
import type { SalesTargetsControllerReadModel } from '@/features/sales/targets/types/read-models/SalesTargetsControllerReadModel';
import { saleInvoicesQuery, saleReturnsQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSalesTargetsControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      employeesQuery(scope),
      journalsQuery(scope),
      saleInvoicesQuery(scope),
      saleReturnsQuery(scope),
      salesTargetsQuery(scope),
    ],
  });
  const state: SalesTargetsControllerReadModel = {
    organization: q0.data,
    employees: q1.data.items,
    extras: {
      records: { salesTargets: mapMasterRecords(q5.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    invoices: [...q3.data.items],
    entries: q2.data.items,
    invoiceReturns: [...q4.data.items],
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
    ),
  };
}
