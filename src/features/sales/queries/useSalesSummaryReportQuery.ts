import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import type { SalesSummaryReportReadModel } from '@/features/sales/types/read-models/SalesSummaryReportReadModel';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { saleInvoicesQuery } from '@/features/trade/public/sale-invoices-query';
import { saleReturnsQuery } from '@/features/trade/public/sale-returns-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSalesSummaryReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      journalsQuery(scope),
      saleInvoicesQuery(scope),
      saleReturnsQuery(scope),
    ],
  });
  const state: SalesSummaryReportReadModel = {
    invoices: [...q4.data.items],
    warehouses: q0.data.items,
    organization: q1.data,
    branches: q2.data.items,
    entries: q3.data.items,
    invoiceReturns: [...q5.data.items],
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
    ),
  };
}
