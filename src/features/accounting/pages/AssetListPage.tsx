import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Assets } from '@/features/accounting/components/Assets';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** قائمة الأصول الثابتة — feature-owned route content. */
export default function AssetListPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~assets">
          <Assets isAdd={false} />
        </section>
      }
    </FeatureDataScope>
  );
}
