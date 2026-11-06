import type { QueryScope } from '@/core/types/api/QueryScope';
import { fetchSettingsBranding } from '@/features/organization/api/read-api';
import { queryOptions } from '@tanstack/react-query';

/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */

export function brandingQuery(scope: QueryScope) {

  return queryOptions({
    queryKey: [
      'erp',
      'settings',
      'branding',
      scope.userId,
      scope.userKind,
      scope.bookId,
      '',
      scope.locale,
    ],

    queryFn: ({ signal }) => fetchSettingsBranding({ bookId: scope.bookId || undefined }, signal),

    staleTime: 30000,
  });
}
