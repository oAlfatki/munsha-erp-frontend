import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { ContactVoucherValidationReadModel } from '@/features/accounting/types/read-models/ContactVoucherValidationReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import { useQueryClient } from '@tanstack/react-query';
export function useContactVoucherValidationData() {
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
    const state: ContactVoucherValidationReadModel = {
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
