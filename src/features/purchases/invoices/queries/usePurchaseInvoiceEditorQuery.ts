import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import {
  booksQuery,
  cashQuery,
  currenciesQuery,
  journalsQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { branchesQuery, companyQuery, systemQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import type { PurchaseInvoiceEditorReadModel } from '@/features/purchases/invoices/types/read-models/PurchaseInvoiceEditorReadModel';
import { itemsQuery, stocksQuery, warehousesQuery } from '@/features/stock/public';
import { purchaseInvoicesQuery, purchaseReturnsQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function usePurchaseInvoiceEditorQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12] = useSuspenseQueries({
    queries: [
      branchesQuery(scope),
      warehousesQuery(scope),
      itemsQuery(scope),
      companyQuery(scope),
      currenciesQuery(scope),
      journalsQuery(scope),
      systemQuery(scope),
      stocksQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      purchaseInvoicesQuery(scope),
      purchaseReturnsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: PurchaseInvoiceEditorReadModel = {
    parties: [...q8.data.items, ...q9.data.items],
    invoices: [...q10.data.items],
    branches: q0.data.items,
    warehouses: q1.data.items,
    products: q2.data.items,
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
