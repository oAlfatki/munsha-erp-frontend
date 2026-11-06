import { ApiError } from '@/core/api/apiError';
import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { booksQuery } from '@/features/ledger/public';
import { fetchPurchasesInvoicesById } from '@/features/trade/api/purchases-read-api';
import { fetchSalesInvoicesById } from '@/features/trade/api/sales-read-api';
import { useSuspenseQuery } from '@tanstack/react-query';

/** The existing mixed-document deep link has no generic GET contract. Only a real 404 tries the other owning API. */

export function useDocumentQuery(id: string) {

  const identity = useQueryIdentity(),
    { data: books } = useSuspenseQuery(booksQuery(identity));
  return useSuspenseQuery({
    queryKey: [
      'erp',
      'trade',
      'document',
      identity.userId,
      identity.userKind,
      books.scope.bookId,
      identity.branchId,
      identity.locale,
      id,
    ],

    queryFn: async () => {

      if (!id) throw Error('رقم المستند مطلوب');
      try {
        return await fetchSalesInvoicesById({ id, bookId: books.scope.bookId });
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 404) throw error;
        return fetchPurchasesInvoicesById({ id, bookId: books.scope.bookId });
      }
    },
  });
}
