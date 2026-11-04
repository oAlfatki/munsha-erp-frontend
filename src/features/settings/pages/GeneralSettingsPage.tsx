import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** الإعدادات العامة — feature-owned route content. */
export default function GeneralSettingsPage() {
  return (
    <section className="screen-page" data-screen="settings~system-general">
      <SystemSettings initialTab="general" />
    </section>
  );
}
