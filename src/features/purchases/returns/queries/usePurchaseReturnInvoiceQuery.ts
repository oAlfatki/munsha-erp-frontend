import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery, cashQuery, journalsQuery, mapMasterRecords } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import type { PurchaseReturnInvoiceReadModel } from '@/features/purchases/returns/types/read-models/PurchaseReturnInvoiceReadModel';
import { itemsQuery, stocksQuery, warehousesQuery } from '@/features/stock/public';
import { purchaseInvoicesQuery, purchaseReturnsQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function usePurchaseReturnInvoiceQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9] = useSuspenseQueries({
    queries: [
      journalsQuery(scope),
      itemsQuery(scope),
      stocksQuery(scope),
      companyQuery(scope),
      warehousesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      purchaseInvoicesQuery(scope),
      purchaseReturnsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: PurchaseReturnInvoiceReadModel = {
    invoices: [...q7.data.items],
    invoiceReturns: [...q8.data.items],
    entries: q0.data.items,
    parties: [...q5.data.items, ...q6.data.items],
    products: q1.data.items,
    stocks: q2.data.items,
    annualBooks: { activeId: books.scope.bookId, books: books.items },
    organization: q3.data,
    warehouses: q4.data.items,
    extras: {
      records: { cash: mapMasterRecords(q9.data.items) },
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
