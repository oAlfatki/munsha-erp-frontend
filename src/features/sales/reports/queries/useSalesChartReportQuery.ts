import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { assetsQuery, booksQuery, journalsQuery, mapMasterRecords } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { employeesQuery } from '@/features/personnel/public';
import type { SalesChartReportReadModel } from '@/features/sales/reports/types/read-models/SalesChartReportReadModel';
import { itemsQuery } from '@/features/stock/public';
import { saleInvoicesQuery, saleReturnsQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSalesChartReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9] = useSuspenseQueries({
    queries: [
      employeesQuery(scope),
      itemsQuery(scope),
      journalsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      saleInvoicesQuery(scope),
      saleReturnsQuery(scope),
      assetsQuery(scope),
    ],
  });
  const state: SalesChartReportReadModel = {
    parties: [...q5.data.items, ...q6.data.items],
    employees: q0.data.items,
    products: q1.data.items,
    invoices: [...q7.data.items],
    invoiceReturns: [...q8.data.items],
    entries: q2.data.items,
    extras: {
      records: { assets: mapMasterRecords(q9.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    organization: q3.data,
    branches: q4.data.items,
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
      q2.data.scope.revision,
      0,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
      q9.data.scope.revision,
    ),
  };
}
