import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات المشتريات — feature-owned route content. */
export default function PurchasesSettingsPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~system-purchases">
          <SystemSettings initialTab="purchases" />
        </section>
      }
    </FeatureDataScope>
  );
}
