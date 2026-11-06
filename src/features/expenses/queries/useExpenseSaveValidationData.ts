import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { ExpenseSaveValidationReadModel } from '@/features/expenses/types/read-models/ExpenseSaveValidationReadModel';
import { booksQuery, expenseDocumentsQuery, mapExpenseReadModel } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { useQueryClient } from '@tanstack/react-query';
export function useExpenseSaveValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d2, d3] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(expenseDocumentsQuery(scope)),
      client.ensureQueryData(systemQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q2 = { data: d2 };
    const q3 = { data: d3 };
    const expenseProjection = mapExpenseReadModel(q2.data.items, q2.data.scope);
    const state: ExpenseSaveValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
      expenseDocuments: expenseProjection.expenseDocuments,
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
