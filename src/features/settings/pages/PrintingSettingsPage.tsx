import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات الطباعة — feature-owned route content. */
export default function PrintingSettingsPage() {
  return (
    <section className="screen-page" data-screen="settings~system-printing">
      <SystemSettings initialTab="printing" />
    </section>
  );
}
