import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery, currenciesQuery, mapMasterRecords } from '@/features/ledger/public';
import { companyQuery, systemQuery } from '@/features/organization/public';
import { partyGroupsQuery } from '@/features/parties/public';
import type { SupplierEditorControllerReadModel } from '@/features/suppliers/types/read-models/SupplierEditorControllerReadModel';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useSupplierEditorControllerQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q2, q3, q4, q5] = useSuspenseQueries({
    queries: [
      systemQuery(scope),
      companyQuery(scope),
      currenciesQuery(scope),
      partyGroupsQuery(scope),
    ],
  });
  const state: SupplierEditorControllerReadModel = {
    systemSettings: q2.data,
    organization: q3.data,
    extras: {
      records: { groups: [...mapMasterRecords(q5.data.items)] },
      operations: [],
      drafts: {},
      preferences: {
        defaultProfit: String(q2.data.inventory.profit),
        defaultDiscount: String(q2.data.inventory.discount),
        defaultPrice: q2.data.sales.defaultPrice,
      },
    },
    currencies: q4.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, 0, 0, q4.data.scope.revision, q5.data.scope.revision),
  };
}
