import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { BranchDirectory } from '@/features/settings/components/screens/BranchDirectory';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** بطاقات الفروع ومواقع التشغيل — feature-owned route content. */
export default function BranchListPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~branches">
          <BranchDirectory />
        </section>
      }
    </FeatureDataScope>
  );
}
