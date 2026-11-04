import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات المصروفات والسندات — feature-owned route content. */
export default function ExpensesSettingsPage() {
  return (
    <section className="screen-page" data-screen="settings~system-expenses">
      <SystemSettings initialTab="expenses" />
    </section>
  );
}
