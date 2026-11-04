import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات المشتريات — feature-owned route content. */
export default function PurchasesSettingsPage() {
  

  return (
    <section className="screen-page" data-screen="settings~system-purchases">
          <SystemSettings initialTab="purchases" />
        </section>
  );
}
