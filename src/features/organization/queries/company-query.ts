import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchSettingsCompany } from '@/features/organization/api/read-api';
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function companyQuery(scope: QueryScope) {
  return queryOptions({
    queryKey: [
      'erp',
      'settings',
      'company',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],
    queryFn: ({ signal }) => fetchSettingsCompany({ bookId: scope.bookId || undefined }, signal),
    staleTime: 30000,
  });
}
