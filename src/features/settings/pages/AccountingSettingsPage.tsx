import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات المحاسبة والضرائب — feature-owned route content. */
export default function AccountingSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-accounting">
          <SystemSettings initialTab="accounting" />
        </section>
      }
    </FeatureDataScope>
  );
}
