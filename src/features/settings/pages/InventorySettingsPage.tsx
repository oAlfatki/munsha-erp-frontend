import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات المخزون — feature-owned route content. */
export default function InventorySettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-inventory">
          <SystemSettings initialTab="inventory" />
        </section>
      }
    </FeatureDataScope>
  );
}
