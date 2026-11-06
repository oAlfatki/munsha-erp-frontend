import { SystemSettings } from '@/features/settings/components/SystemSettings';

/** إعدادات المنشأة — feature-owned route content. */

export default function CompanySettingsPage() {

  return (
    <section className="screen-page" data-screen="settings~system-company">
      <SystemSettings initialTab="company" />
    </section>
  );
}
