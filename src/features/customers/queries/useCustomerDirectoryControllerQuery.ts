import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { CustomerDirectoryControllerReadModel } from '@/features/customers/types/read-models/CustomerDirectoryControllerReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { partyGroupsQuery } from '@/features/parties/public/party-groups-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useCustomerDirectoryControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1] = useSuspenseQueries({ queries: [journalsQuery(scope), partyGroupsQuery(scope)] });
  const state: CustomerDirectoryControllerReadModel = {
    extras: {
      records: { groups: [...mapMasterRecords(q1.data.items)] },
      operations: [],
      drafts: {},
      preferences: {},
    },
    entries: q0.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(books.scope.revision, q0.data.scope.revision, q1.data.scope.revision),
  };
}
