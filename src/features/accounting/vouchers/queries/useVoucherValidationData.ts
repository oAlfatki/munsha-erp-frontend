import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { VoucherValidationReadModel } from '@/features/accounting/vouchers/types/read-models/VoucherValidationReadModel';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { useQueryClient } from '@tanstack/react-query';
export function useVoucherValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d3] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(systemQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q3 = { data: d3 };
    const state: VoucherValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
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
