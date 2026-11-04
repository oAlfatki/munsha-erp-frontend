import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { companyQuery } from '@/features/organization/public/company-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import type { SalesInvoicesControllerReadModel } from '@/features/sales/types/read-models/SalesInvoicesControllerReadModel';
import { itemsQuery } from '@/features/stock/public/items-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { saleInvoicesQuery } from '@/features/trade/public/sale-invoices-query';
import { saleReturnsQuery } from '@/features/trade/public/sale-returns-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSalesInvoicesControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      journalsQuery(scope),
      warehousesQuery(scope),
      itemsQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      saleInvoicesQuery(scope),
      saleReturnsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: SalesInvoicesControllerReadModel = {
    invoices: [...q6.data.items],
    parties: [...q4.data.items, ...q5.data.items],
    organization: q0.data,
    entries: q1.data.items,
    invoiceReturns: [...q7.data.items],
    warehouses: q2.data.items,
    products: q3.data.items,
    extras: {
      records: { cash: mapMasterRecords(q8.data.items) },
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
    revision: Math.max(
      books.scope.revision,
      0,
      q1.data.scope.revision,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
    ),
  };
}
