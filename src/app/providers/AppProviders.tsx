import { readAccess } from '@/app/services/access-service';
import { prepareLogout } from '@/app/services/prepare-logout';
import type { AppProvidersProps } from '@/app/types/props/AppProvidersProps';
import { QUERY_CLIENT } from '@/core/api/queryClient';
import { configureSessionRefresh } from '@/core/api/session-transport';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { authApi, getAccount } from '@/features/auth/public';
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
