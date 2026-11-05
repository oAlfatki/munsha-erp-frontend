import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { purchaseInvoicesQuery } from '@/features/trade/queries/purchase-invoices-query';
import { saleInvoicesQuery } from '@/features/trade/queries/sale-invoices-query';
import type { DeleteDraftValidationReadModel } from '@/features/trade/types/read-models/DeleteDraftValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';
export function useDeleteDraftValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d3, d4, d5] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(systemQuery(scope)),
      client.ensureQueryData(saleInvoicesQuery(scope)),
      client.ensureQueryData(purchaseInvoicesQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q3 = { data: d3 };
    const q4 = { data: d4 };
    const q5 = { data: d5 };
    const state: DeleteDraftValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
      invoices: [...q4.data.items, ...q5.data.items],
      systemSettings: q3.data,
      extras: {
        records: {},
        operations: [],
        drafts: {},
        preferences: {
          defaultProfit: String(q3.data.inventory.profit),
          defaultDiscount: String(q3.data.inventory.discount),
          defaultPrice: q3.data.sales.defaultPrice,
        },
      },
    };
    return state;
  };
}
