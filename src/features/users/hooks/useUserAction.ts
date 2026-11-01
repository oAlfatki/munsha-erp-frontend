import { authRequest } from '@/features/auth/api/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useUserAction() {
  const cache = useQueryClient();
  return useMutation({
    mutationFn: authRequest,
    onSuccess: async () => {
      await cache.invalidateQueries({ queryKey: ['auth', 'account'] });
    },
  });
}
