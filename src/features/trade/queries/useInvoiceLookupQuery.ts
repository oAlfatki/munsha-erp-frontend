import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { purchaseInvoicesQuery } from '@/features/trade/queries/purchase-invoices-query';
import { saleInvoicesQuery } from '@/features/trade/queries/sale-invoices-query';
import type { InvoiceLookupReadModel } from '@/features/trade/types/read-models/InvoiceLookupReadModel';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useInvoiceLookupQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3] = useSuspenseQueries({
    queries: [
      customersQuery(scope),
      suppliersQuery(scope),
      saleInvoicesQuery(scope),
      purchaseInvoicesQuery(scope),
    ],
  });
  const state: InvoiceLookupReadModel = {
    invoices: [...q2.data.items, ...q3.data.items],
    parties: [...q0.data.items, ...q1.data.items],
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
      q3.data.scope.revision,
    ),
  };
}
