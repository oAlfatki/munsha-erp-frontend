import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { readCachedQuery } from '@/core/query/read-cached-query';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import type { SystemSettingsValidationReadModel } from '@/features/settings/types/read-models/SystemSettingsValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';

export function useSystemSettingsValidationData() {

  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await readCachedQuery(client, booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0] = await Promise.all([readCachedQuery(client, companyQuery(scope))]);
    const q0 = { data: d0 };
    const state: SystemSettingsValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
    };
    return state;
  };
}
