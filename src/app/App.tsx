import { AppProviders } from '@/app/providers/AppProviders';
import { AppRouter } from '@/app/router/AppRouter';
import { ReportPreview } from '@/core/reporting/Preview';
import type { AppProps } from '@/core/types/AppProps';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { FieldNavigation } from '@/shared/ui/forms/FieldNavigation';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

export function App({ initialUser }: AppProps) {
  return (
    <AppProviders initialUser={initialUser}>
      <FieldNavigation />
      <Suspense fallback={<LoadingState />}>
        <AppRouter />
      </Suspense>
      <ReportPreview />
      <Toaster position="bottom-left" dir="rtl" richColors closeButton />
    </AppProviders>
  );
}
