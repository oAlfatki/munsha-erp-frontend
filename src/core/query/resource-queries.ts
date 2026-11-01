import type { DataResource } from '@/core/types/DataResource';
import type { Identity } from '@/core/types/Identity';
import type { ResourceResult } from '@/core/types/ResourceResult';
import type { UseQueryResult } from '@tanstack/react-query';
export function resourceQueryKey(resource: DataResource, user: Identity | null, bookId: string) {
  return ['erp', resource.owner, resource.id, user?.userId, user?.kind, bookId, ''] as const;
}
export function resourceQueryOptions(
  resource: DataResource,
  user: Identity | null,
  bookId: string,
  isEnabled: boolean,
) {
  return {
    queryKey: resourceQueryKey(resource, user, bookId),
    queryFn: () => resource.read({ bookId: bookId || undefined }),
    enabled: isEnabled,
    retry: 1,
  };
}
export function combineResourceQueries(queries: UseQueryResult<ResourceResult, Error>[]) {
  return {
    data: queries.flatMap((query) => (query.data ? [query.data] : [])),
    ready: queries.every((query) => query.isSuccess),
    pending: queries.some((query) => query.isPending),
    error: queries.find((query) => query.error)?.error?.message || '',
  };
}
