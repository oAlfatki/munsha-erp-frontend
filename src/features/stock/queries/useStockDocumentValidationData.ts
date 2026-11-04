import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { booksQuery } from '@/features/ledger/public/books-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import type { StockDocumentValidationReadModel } from '@/features/stock/public/types/read-models/StockDocumentValidationReadModel';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { useQueryClient } from '@tanstack/react-query';
export function useStockDocumentValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d1, d3] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(warehousesQuery(scope)),
      client.ensureQueryData(systemQuery(scope)),
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
