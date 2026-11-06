import { SystemSettings } from '@/features/settings/components/SystemSettings';

/** إعدادات الفروع — feature-owned route content. */

export default function BranchesSettingsPage() {

  return (
    <section className="screen-page" data-screen="settings~system-branches">
      <SystemSettings initialTab="branches" />
    </section>
  );
}
