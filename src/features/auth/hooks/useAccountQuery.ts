import { useAuth } from '@/core/auth/AuthProvider';
import { getAccount } from '@/features/auth/services/auth-service';
import { useQuery } from '@tanstack/react-query';
export function useAccountQuery() {
  const { user } = useAuth();
  return useQuery({ queryKey: ['auth', 'account', user?.userId, user?.kind], queryFn: getAccount });
}
