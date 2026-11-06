import { QUERY_CLIENT } from '@/core/api/queryClient';
import type { Identity } from '@/core/types/auth/Identity';
import { automaticBackup } from '@/features/organization/public';
/** App coordination only. A required exit backup completes before the session is revoked. */
export async function prepareLogout(user: Identity) {
  const cached = QUERY_CLIENT.getQueriesData<{ mode?: string }>({
    queryKey: ['erp', 'settings', 'backupPolicy'],
  }).filter(([key]) => key[3] === user.userId && key[4] === 'aspnet');
  if (cached.some(([, policy]) => policy?.mode === 'exit')) await automaticBackup('exit');
}
