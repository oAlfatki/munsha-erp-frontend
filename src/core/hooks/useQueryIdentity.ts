import { useAuth } from '@/core/auth/AuthProvider';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { QueryScope } from '@/core/types/QueryScope';
import { useTranslation } from 'react-i18next';
export function useQueryIdentity(): QueryScope {
  const { user } = useAuth();
  const { branchId } = useApplication();
  const { i18n } = useTranslation();
  return {
    userId: user?.userId || '',
    userKind: user?.kind || '',
    bookId: '',
    branchId,
    locale: i18n.language || 'ar',
  };
}
