import { FieldNavigation } from '@/shared/ui/forms/FieldNavigation';
import { AppProviders } from '@/app/providers/AppProviders';
import { ReportPreview } from '@/core/reporting/Preview';
import { AppRouter } from '@/app/router/AppRouter';
import type { AppProps } from '@/core/types/AppProps';
import { Toaster } from 'sonner';

export function App({ initialUser }: AppProps) {
  return (
    <AppProviders initialUser={initialUser}>
      <FieldNavigation />
      <AppRouter />
      <ReportPreview />
      <Toaster position="bottom-left" dir="rtl" richColors closeButton />
    </AppProviders>
  );
}
