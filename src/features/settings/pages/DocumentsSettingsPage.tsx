import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات المستندات والترقيم — feature-owned route content. */
export default function DocumentsSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-documents">
          <SystemSettings initialTab="documents" />
        </section>
      }
    </FeatureDataScope>
  );
}
