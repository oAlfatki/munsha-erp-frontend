import type { AuthProviderProps } from '@/core/types/AuthProviderProps';
import type { Identity } from '@/core/types/Identity';
import { getAccount } from '@/features/auth/services/auth-service';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext<{
  user: Identity | null;
  loading: boolean;
  setUser: (user: Identity | null) => void;
  error: Error | null;
  retry: () => void;
}>(null!);

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<Identity | null | undefined>(() => initialUser ?? undefined);
  const query = useQuery({
    queryKey: ['session'],
    queryFn: getAccount,
    enabled: user === undefined,
    retry: false,
  });
  useEffect(() => {
    if (query.data) setUser(query.data.user);
  }, [query.data]);
  useEffect(() => {
    const logout = () => setUser(null);
    window.addEventListener('auth:unauthorized', logout);
    return () => window.removeEventListener('auth:unauthorized', logout);
  }, []);
  return (
    <Context.Provider
      value={{
        user: user || null,
        loading: user === undefined && !query.isError,
        setUser,
        error: query.error,
        retry: () => {
          void query.refetch();
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useAuth = () => useContext(Context);
