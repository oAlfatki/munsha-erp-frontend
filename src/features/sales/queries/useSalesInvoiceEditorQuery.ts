import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import type { SalesInvoiceEditorReadModel } from '@/features/sales/types/read-models/SalesInvoiceEditorReadModel';
import { itemsQuery } from '@/features/stock/public/items-query';
import { stocksQuery } from '@/features/stock/public/stocks-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { saleInvoicesQuery } from '@/features/trade/public/sale-invoices-query';
import { saleReturnsQuery } from '@/features/trade/public/sale-returns-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSalesInvoiceEditorQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12] = useSuspenseQueries({
    queries: [
      itemsQuery(scope),
      branchesQuery(scope),
      warehousesQuery(scope),
      companyQuery(scope),
      currenciesQuery(scope),
      journalsQuery(scope),
      systemQuery(scope),
      stocksQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      saleInvoicesQuery(scope),
      saleReturnsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: SalesInvoiceEditorReadModel = {
    parties: [...q8.data.items, ...q9.data.items],
    products: q0.data.items,
    invoices: [...q10.data.items],
    branches: q1.data.items,
    warehouses: q2.data.items,
    organization: q3.data,
    currencies: q4.data.items,
    entries: q5.data.items,
    systemSettings: q6.data,
    extras: {
      records: { cash: mapMasterRecords(q12.data.items) },
      operations: [],
      drafts: {},
      preferences: {
        defaultProfit: String(q6.data.inventory.profit),
        defaultDiscount: String(q6.data.inventory.discount),
        defaultPrice: q6.data.sales.defaultPrice,
      },
    },
    invoiceReturns: [...q11.data.items],
    stocks: q7.data.items,
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
      0,
      q7.data.scope.revision,
      q8.data.scope.revision,
      q9.data.scope.revision,
      q10.data.scope.revision,
      q11.data.scope.revision,
      q12.data.scope.revision,
    ),
  };
}
