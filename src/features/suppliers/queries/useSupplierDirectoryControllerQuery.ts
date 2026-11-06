import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery, journalsQuery, mapMasterRecords } from '@/features/ledger/public';
import { partyGroupsQuery } from '@/features/parties/public';
import type { SupplierDirectoryControllerReadModel } from '@/features/suppliers/types/read-models/SupplierDirectoryControllerReadModel';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useSupplierDirectoryControllerQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1] = useSuspenseQueries({ queries: [journalsQuery(scope), partyGroupsQuery(scope)] });
  const state: SupplierDirectoryControllerReadModel = {
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
