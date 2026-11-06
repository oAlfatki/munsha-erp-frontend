import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { readCachedQuery } from '@/core/query/read-cached-query';
import { booksQuery, currenciesQuery, journalsQuery } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { itemsQuery, movementsQuery, stocksQuery, warehousesQuery } from '@/features/stock/public';
import { purchaseInvoicesQuery } from '@/features/trade/queries/purchase-invoices-query';
import { saleInvoicesQuery } from '@/features/trade/queries/sale-invoices-query';
import type { InvoiceValidationReadModel } from '@/features/trade/types/read-models/InvoiceValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';

export function useInvoiceValidationData() {

  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await readCachedQuery(client, booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d1, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12] = await Promise.all([
      readCachedQuery(client, companyQuery(scope)),
      readCachedQuery(client, warehousesQuery(scope)),
      readCachedQuery(client, systemQuery(scope)),
      readCachedQuery(client, currenciesQuery(scope)),
      readCachedQuery(client, movementsQuery(scope)),
      readCachedQuery(client, itemsQuery(scope)),
      readCachedQuery(client, stocksQuery(scope)),
      readCachedQuery(client, journalsQuery(scope)),
      readCachedQuery(client, customersQuery(scope)),
      readCachedQuery(client, suppliersQuery(scope)),
      readCachedQuery(client, saleInvoicesQuery(scope)),
      readCachedQuery(client, purchaseInvoicesQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q1 = { data: d1 };
    const q3 = { data: d3 };
    const q4 = { data: d4 };
    const q5 = { data: d5 };
    const q6 = { data: d6 };
    const q7 = { data: d7 };
    const q8 = { data: d8 };
    const q9 = { data: d9 };
    const q10 = { data: d10 };
    const q11 = { data: d11 };
    const q12 = { data: d12 };
    const state: InvoiceValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
      invoices: [...q11.data.items, ...q12.data.items],
      warehouses: q1.data.items,
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
      currencies: q4.data.items,
      parties: [...q9.data.items, ...q10.data.items],
      movements: q5.data.items,
      products: q6.data.items,
      stocks: q7.data.items,
      entries: q8.data.items,
    };
    return state;
  };
}
