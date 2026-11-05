import { useAuth } from '@/core/auth/AuthProvider';
import { APP_LOCALE } from '@/core/config/locale';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { QueryScope } from '@/core/types/api/QueryScope';
export function useQueryIdentity(): QueryScope {
  const { user } = useAuth();
  const { branchId } = useApplication();
  return {
    userId: user?.userId || '',
    userKind: 'aspnet',
    bookId: '',
    branchId,
    locale: APP_LOCALE,
  };
}
