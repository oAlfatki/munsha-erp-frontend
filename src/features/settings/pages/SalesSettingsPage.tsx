import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات المبيعات — feature-owned route content. */
export default function SalesSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-sales">
          <SystemSettings initialTab="sales" />
        </section>
      }
    </FeatureDataScope>
  );
}
