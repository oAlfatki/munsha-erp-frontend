import { ApiError } from '@/core/api/apiError';
import { advanceSession, sessionGeneration } from '@/core/api/session-transport';
import { canPerform } from '@/core/auth/permissions';
import type { AuthContextValue } from '@/core/types/auth/AuthContextValue';
import type { Identity } from '@/core/types/auth/Identity';
import type { AuthProviderProps } from '@/core/types/props/AuthProviderProps';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
const Context = createContext<AuthContextValue>(null!);
export function AuthProvider({
  children,
  initialUser,
  readSession,
  readAccess,
  endSession,
  beforeLogout,
}: AuthProviderProps) {
  const cache = useQueryClient();
  const [user, setUser] = useState<Identity | null | undefined>(initialUser);
  const userRef = useRef(user);
  userRef.current = user;
  const cleanup = useRef<Promise<void>>(Promise.resolve());
  const logoutFlight = useRef<Promise<void> | null>(null);
  const session = useQuery({
    queryKey: ['session'],
    queryFn: ({ signal }) => readSession(signal),
    enabled: user === undefined,
    retry: false,
  });
  const accessQuery = useQuery({
    queryKey: ['access', user?.userId, user?.branchId, user?.permissions],
    queryFn: ({ signal }) => readAccess(user!, signal),
    enabled: !!user,
    retry: false,
  });
  const clearSession = async () => {
    advanceSession();
    userRef.current = null;
    setUser(null);
    const pending = cache.cancelQueries().then(() => {
      cache.clear();
    });
    cleanup.current = pending;
    await pending;
  };
  const prepareLogin = async () => {
    await clearSession();
    return sessionGeneration();
  };
  const establishSession = async (identity: Identity, expected: number) => {
    await cleanup.current;
    if (expected !== sessionGeneration()) throw Error('أُلغيت محاولة تسجيل الدخول؛ أعد المحاولة.');
    userRef.current = identity;
    setUser(identity);
  };
  const refreshIdentity = async () => {
    const expected = sessionGeneration();
    const data = await readSession();
    if (expected !== sessionGeneration()) return;
    if (userRef.current?.userId !== data.user.userId) {
      await clearSession();
      return;
    }
    userRef.current = data.user;
    setUser(data.user);
  };
  const logout = () => {
    if (logoutFlight.current) return logoutFlight.current;
    const current = userRef.current;
    const run = async () => {
      if (!current) return clearSession();
      await beforeLogout?.(current, accessQuery.data || null);
      try {
        await endSession();
      } catch (error) {
        if (!(error instanceof ApiError && error.status === 401)) throw error;
      }
      await clearSession();
    };
    const operation = run();
    logoutFlight.current = operation;
    void operation
      .finally(() => {
        if (logoutFlight.current === operation) logoutFlight.current = null;
      })
      .catch(() => {});
    return operation;
  };
  useEffect(() => {
    if (userRef.current !== undefined) return;
    if (session.data) {
      userRef.current = session.data.user;
      setUser(session.data.user);
    } else if (session.error instanceof ApiError && session.error.status === 401) {
      userRef.current = null;
      setUser(null);
    }
  }, [session.data, session.error]);
  useEffect(() => {
    const expire = () => {
      void clearSession();
    };
    window.addEventListener('auth:unauthorized', expire);
    return () => window.removeEventListener('auth:unauthorized', expire);
  }, []);
  return (
    <Context.Provider
      value={{
        user: user || null,
        loading: user === undefined && session.isPending,
        error: session.error,
        access: accessQuery.data || null,
        accessError: accessQuery.error,
        isAccessLoading: !!user && accessQuery.isPending,
        prepareLogin,
        establishSession,
        clearSession,
        logout,
        refreshIdentity,
        retry: () => {
          void session.refetch();
        },
        can: (module, code, branchId) =>
          !!user && canPerform(accessQuery.data, module, code, branchId ?? user.branchId),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useAuth = () => useContext(Context);
