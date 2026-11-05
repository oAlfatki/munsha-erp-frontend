import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { PeriodTransferValidationReadModel } from '@/features/accounting/fiscal-periods/types/read-models/PeriodTransferValidationReadModel';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { useQueryClient } from '@tanstack/react-query';
export function usePeriodTransferValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0] = await Promise.all([client.ensureQueryData(companyQuery(scope))]);
    const q0 = { data: d0 };
    const state: PeriodTransferValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
    };
    return state;
  };
}
