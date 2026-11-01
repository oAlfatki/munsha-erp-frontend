import { QueryClient } from '@tanstack/react-query';
export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30000, retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
});
