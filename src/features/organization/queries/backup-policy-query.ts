import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchSettingsBackupPolicy } from '@/features/organization/api/read-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function backupPolicyQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'settings',
      'backupPolicy',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) =>
      fetchSettingsBackupPolicy({ bookId: scope.bookId || undefined }, signal),
    staleTime: 30000,
  });
}
