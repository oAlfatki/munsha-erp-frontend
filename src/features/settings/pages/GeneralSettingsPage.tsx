import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** الإعدادات العامة — feature-owned route content. */
export default function GeneralSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-general">
          <SystemSettings initialTab="general" />
        </section>
      }
    </FeatureDataScope>
  );
}
