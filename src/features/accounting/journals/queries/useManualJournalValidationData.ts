import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { ManualJournalValidationReadModel } from '@/features/accounting/journals/types/read-models/ManualJournalValidationReadModel';
import { booksQuery } from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { useQueryClient } from '@tanstack/react-query';
export function useManualJournalValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d4] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(branchesQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q4 = { data: d4 };
    const state: ManualJournalValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
      extras: { records: {}, operations: [], drafts: {}, preferences: {} },
      branches: q4.data.items,
    };
    return state;
  };
}
