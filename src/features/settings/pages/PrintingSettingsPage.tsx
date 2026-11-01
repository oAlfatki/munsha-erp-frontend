import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات الطباعة — feature-owned route content. */
export default function PrintingSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-printing">
          <SystemSettings initialTab="printing" />
        </section>
      }
    </FeatureDataScope>
  );
}
