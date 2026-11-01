import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Assets } from '@/features/accounting/components/Assets';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** إضافة أصل ثابت — feature-owned route content. */
export default function CreateAssetPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~assets-add">
          <Assets isAdd={true} />
        </section>
      }
    </FeatureDataScope>
  );
}
