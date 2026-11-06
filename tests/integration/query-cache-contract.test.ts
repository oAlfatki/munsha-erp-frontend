import { afterEach, expect, it, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { readCachedQuery } from '@/core/query/read-cached-query';

const clients: QueryClient[] = [];

function setup() {

  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  clients.push(client);
  return client;
}

afterEach(() => clients.splice(0).forEach((client) => client.clear()));

it('reuses cached data even after invalidation without changing query options', async () => {
  const client = setup();
  const queryFn = vi.fn(async () => ({ balance: 10 }));
  const options = { queryKey: ['balances', 'user-1', 'branch-1'], queryFn, staleTime: 12 };
  const initial = await readCachedQuery(client, options);
  await client.invalidateQueries({ queryKey: options.queryKey, refetchType: 'none' });
  expect(await readCachedQuery(client, options)).toBe(initial);
  expect(queryFn).toHaveBeenCalledTimes(1);
  expect(client.getQueryCache().find({ queryKey: options.queryKey })?.options.staleTime).toBe(12);
});

it('deduplicates concurrent misses and isolates another branch', async () => {
  const client = setup();
  const queryFn = vi.fn(async () => 5);
  const options = { queryKey: ['balances', 'user-1', 'branch-1'], queryFn };
  expect(
    await Promise.all([readCachedQuery(client, options), readCachedQuery(client, options)]),
  ).toEqual([5, 5]);
  expect(queryFn).toHaveBeenCalledTimes(1);
  await readCachedQuery(client, { ...options, queryKey: ['balances', 'user-1', 'branch-2'] });
  expect(queryFn).toHaveBeenCalledTimes(2);
});
