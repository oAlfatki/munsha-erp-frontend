import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات المخزون — feature-owned route content. */
export default function InventorySettingsPage() {
  return (
    <section className="screen-page" data-screen="settings~system-inventory">
      <SystemSettings initialTab="inventory" />
    </section>
  );
}
