import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { readCachedQuery } from '@/core/query/read-cached-query';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { warehousesQuery } from '@/features/stock/queries/warehouses-query';
import type { StockDocumentValidationReadModel } from '@/features/stock/types/read-models/StockDocumentValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';

export function useStockDocumentValidationData() {

  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await readCachedQuery(client, booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d1, d3] = await Promise.all([
      readCachedQuery(client, companyQuery(scope)),
      readCachedQuery(client, warehousesQuery(scope)),
      readCachedQuery(client, systemQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q1 = { data: d1 };
    const q3 = { data: d3 };
    const state: StockDocumentValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
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
    };
    return state;
  };
}
