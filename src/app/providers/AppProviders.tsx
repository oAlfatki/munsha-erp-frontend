import {getAccount} from '@/features/auth/services/auth-service';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { QUERY_CLIENT } from '@/core/api/queryClient';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import type { AppProvidersProps } from '@/core/types/AppProvidersProps';
import { QueryClientProvider } from '@tanstack/react-query';

export function AppProviders({ children, initialUser }: AppProvidersProps) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <AuthProvider initialUser={initialUser} readSession={getAccount}>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
