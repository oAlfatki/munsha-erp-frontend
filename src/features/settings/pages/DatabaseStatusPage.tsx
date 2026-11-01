import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { AnnualSettings } from '@/features/settings/components/AnnualSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** حالة الاتصال بقاعدة البيانات — feature-owned route content. */
export default function DatabaseStatusPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~database">
          <AnnualSettings isConnection={true} />
        </section>
      }
    </FeatureDataScope>
  );
}
