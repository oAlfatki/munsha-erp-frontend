import type { DefaultError, FetchQueryOptions, QueryClient, QueryKey } from '@tanstack/react-query';

/** Read existing scoped data even when stale; fetch only on a cache miss. */

export function readCachedQuery<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  client: QueryClient,
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): Promise<TData> {

  const defaultedOptions = client.defaultQueryOptions(options);
  const query = client.getQueryCache().build(client, defaultedOptions);
  const cachedData = query.state.data;
  return cachedData === undefined ? client.query(options) : Promise.resolve(cachedData);
}
