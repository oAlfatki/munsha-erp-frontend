import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { ImportMasters } from '@/features/settings/components/ImportMasters';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** استيراد البطاقات من CSV — feature-owned route content. */
export default function ImportMasterDataPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~migration">
          <ImportMasters />
        </section>
      }
    </FeatureDataScope>
  );
}
