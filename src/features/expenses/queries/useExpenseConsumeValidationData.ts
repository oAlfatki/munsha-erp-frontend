import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { readCachedQuery } from '@/core/query/read-cached-query';
import type { ExpenseConsumeValidationReadModel } from '@/features/expenses/types/read-models/ExpenseConsumeValidationReadModel';
import { booksQuery } from '@/features/ledger/public';
import { companyQuery } from '@/features/organization/public';
import { useQueryClient } from '@tanstack/react-query';

export function useExpenseConsumeValidationData() {

  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await readCachedQuery(client, booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0] = await Promise.all([readCachedQuery(client, companyQuery(scope))]);
    const q0 = { data: d0 };
    const state: ExpenseConsumeValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
    };
    return state;
  };
}
