import { useAuth } from '@/core/auth/AuthProvider';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { QueryScope } from '@/core/types/QueryScope';
import { APP_LOCALE } from '@/core/config/locale';
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
