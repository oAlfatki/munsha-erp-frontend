import { authRequest } from '@/features/auth/api/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useAuthAction() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: authRequest,
    onSuccess: () => client.invalidateQueries({ queryKey: ['auth', 'account'] }),
  });
}
