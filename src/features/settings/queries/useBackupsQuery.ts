import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public';
import { backupPolicyQuery } from '@/features/organization/public';
import type { BackupsReadModel } from '@/features/settings/types/read-models/BackupsReadModel';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useBackupsQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0] = useSuspenseQueries({ queries: [backupPolicyQuery(scope)] });
  const state: BackupsReadModel = { backupSettings: q0.data };
  return { ...app, state, loading: false, error: '', revision: Math.max(books.scope.revision, 0) };
}
