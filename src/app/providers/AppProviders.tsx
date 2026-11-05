import { QUERY_CLIENT } from '@/core/api/queryClient';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import type { AppProvidersProps } from '@/core/types/AppProvidersProps';
import { readAccess } from '@/app/services/access-service';
import { authApi } from '@/features/auth/api/auth-api';
import { configureSessionRefresh } from '@/core/api/session-transport';
import { prepareLogout } from '@/app/services/prepare-logout';
import { getAccount } from '@/features/auth/services/auth-service';
import { QueryClientProvider } from '@tanstack/react-query';

configureSessionRefresh(async (generation) => {
  await authApi.refresh(generation);
});
export function AppProviders({ children, initialUser }: AppProvidersProps) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <AuthProvider
          initialUser={initialUser}
          readSession={getAccount}
          readAccess={readAccess}
          endSession={authApi.logout}
          beforeLogout={prepareLogout}
        >
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
