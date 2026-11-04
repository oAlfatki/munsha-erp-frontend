import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { PeriodSwitchValidationReadModel } from '@/features/accounting/types/read-models/PeriodSwitchValidationReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { useQueryClient } from '@tanstack/react-query';
export function usePeriodSwitchValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0] = await Promise.all([client.ensureQueryData(companyQuery(scope))]);
    const q0 = { data: d0 };
    const state: PeriodSwitchValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
    };
    return state;
  };
}
