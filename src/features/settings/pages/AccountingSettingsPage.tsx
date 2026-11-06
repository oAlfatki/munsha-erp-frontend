import { SystemSettings } from '@/features/settings/components/SystemSettings';

/** إعدادات المحاسبة والضرائب — feature-owned route content. */

export default function AccountingSettingsPage() {

  return (
    <section className="screen-page" data-screen="settings~system-accounting">
      <SystemSettings initialTab="accounting" />
    </section>
  );
}
