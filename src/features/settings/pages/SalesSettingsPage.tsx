import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات المبيعات — feature-owned route content. */
export default function SalesSettingsPage() {
  

  return (
    <section className="screen-page" data-screen="settings~system-sales">
          <SystemSettings initialTab="sales" />
        </section>
  );
}
