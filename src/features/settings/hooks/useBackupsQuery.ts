import { useAuth } from '@/core/auth/AuthProvider';
import { fetchBackups } from '@/features/settings/api/backups';
import { useQuery } from '@tanstack/react-query';
export function useBackupsQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['erp', 'settings', 'backups', user?.userId, user?.kind],
    queryFn: fetchBackups,
  });
}
