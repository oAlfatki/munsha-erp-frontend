import { useAuth } from '@/core/auth/AuthProvider';
import { fetchBackups } from '@/features/organization/public';
import { useQuery } from '@tanstack/react-query';

export function useBackupsQuery() {

  const { user } = useAuth();
  return useQuery({
    queryKey: ['erp', 'settings', 'backups', user?.userId, 'aspnet'],
    queryFn: fetchBackups,
  });
}
