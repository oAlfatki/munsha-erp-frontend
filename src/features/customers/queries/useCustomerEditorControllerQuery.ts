import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { CustomerEditorControllerReadModel } from '@/features/customers/types/read-models/CustomerEditorControllerReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import { partyGroupsQuery } from '@/features/parties/public/party-groups-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useCustomerEditorControllerQuery() {
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
  const state: CustomerEditorControllerReadModel = {
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
