import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from '@/core/auth/AuthProvider';
import type { AuthContextValue } from '@/core/types/auth/AuthContextValue';
import type { AuthProviderProps } from '@/core/types/props/AuthProviderProps';
import type { Identity } from '@/core/types/auth/Identity';
import { ApiError } from '@/core/api/apiError';
const clients: QueryClient[] = [];
afterEach(() => {
  for (const client of clients) client.clear();
  clients.length = 0;
});
const user: Identity = {
  userId: '1',
  username: 'test',
  displayName: 'اختبار',
  fullName: 'اختبار',
  email: '',
  branchId: '2',
  permissions: [],
};
function setup(
  overrides: Partial<AuthProviderProps> = {},
  primeCache?: (client: QueryClient) => void,
) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { gcTime: Infinity },
    },
  });
  clients.push(client);
  primeCache?.(client);
  let auth!: AuthContextValue;
  function Capture() {
    auth = useAuth();
    return null;
  }
  const endSession = vi.fn(async () => {});
  const props = {
    initialUser: user,
    readSession: async () => ({ user }),
    readAccess: async () => ({ status: 'ready' as const, grants: [] }),
    endSession,
    ...overrides,
    children: createElement(Capture),
  };
  renderToString(
    createElement(QueryClientProvider, { client }, createElement(AuthProvider, props)),
  );
  return { client, auth, endSession };
}
it('clears all previous account query and mutation cache before a new login', async () => {
  const { client, auth } = setup();
  client.setQueryData(['erp', 'private', '1'], { private: 'old' });
  client.getMutationCache().build(
    client,
    { mutationFn: async () => {} },
    {
      context: undefined,
      data: undefined,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: 'success',
      variables: { sensitive: 'old' },
      submittedAt: 0,
    },
  );
  await auth.prepareLogin();
  expect(client.getQueryCache().getAll()).toHaveLength(0);
  expect(client.getMutationCache().getAll()).toHaveLength(0);
});
it('cancels in-flight previous account queries before clearing data', async () => {
  const { client, auth } = setup();
  let isAborted = false;
  const pending = client
    .fetchQuery({
      queryKey: ['private', 'old'],
      queryFn: ({ signal }) =>
        new Promise((resolve) => {
          signal.addEventListener('abort', () => {
            isAborted = true;
            resolve('old');
          });
        }),
    })
    .catch(() => undefined);
  await auth.prepareLogin();
  await pending;
  expect(isAborted).toBe(true);
  expect(client.getQueryData(['private', 'old'])).toBeUndefined();
});
it('rejects a stale login attempt after a second session transition', async () => {
  const { auth } = setup();
  const old = await auth.prepareLogin();
  await auth.prepareLogin();
  await expect(auth.establishSession(user, old)).rejects.toThrow('أُلغيت');
});
it('shares one centralized logout operation and clears cached account data', async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const endSession = vi.fn(() => gate);
  const { client, auth } = setup({ endSession });
  client.setQueryData(['private'], { old: true });
  const first = auth.logout(),
    second = auth.logout();
  expect(second).toBe(first);
  release();
  await first;
  expect(endSession).toHaveBeenCalledTimes(1);
  expect(client.getQueryData(['private'])).toBeUndefined();
});
it('preserves account data when logout fails due to a temporary connection error', async () => {
  const { client, auth } = setup({
    endSession: async () => {
      throw new ApiError({ detail: 'network' }, 0);
    },
  });
  client.setQueryData(['private'], { old: true });
  await expect(auth.logout()).rejects.toMatchObject({ status: 0 });
  expect(client.getQueryData(['private'])).toEqual({ old: true });
});
it('does not revoke a session when its required exit backup fails', async () => {
  const beforeLogout = vi.fn(async () => {
    throw Error('فشل النسخ الاحتياطي');
  });
  const { client, auth, endSession } = setup({ beforeLogout });
  client.setQueryData(['private'], { old: true });
  await expect(auth.logout()).rejects.toThrow('النسخ');
  expect(endSession).not.toHaveBeenCalled();
  expect(client.getQueryData(['private'])).toEqual({ old: true });
});

it('keeps restoration pending after the session query succeeds until identity is committed', () => {
  const { auth } = setup({ initialUser: undefined }, (client) => {
    client.setQueryData(['session'], { user });
  });
  // Effects have not run during this render: query success must not expose a signed-out state.
  expect(auth.user).toBeNull();
  expect(auth.loading).toBe(true);
});
it('does not keep an explicitly signed-out account in restoration', () => {
  const { auth } = setup({ initialUser: null });
  expect(auth.user).toBeNull();
  expect(auth.loading).toBe(false);
});
it('exposes failed restoration for retry instead of showing an endless loader', () => {
  const failure = new ApiError({ detail: 'connection unavailable' }, 503);
  const { auth } = setup({ initialUser: undefined }, (client) => {
    client.setQueryDefaults(['session'], { retryOnMount: false });
    const query = client.getQueryCache().build(client, { queryKey: ['session'] });
    query.setState({ status: 'error', error: failure, fetchStatus: 'idle' });
  });
  expect(auth.loading).toBe(false);
  expect(auth.error).toBe(failure);
});
