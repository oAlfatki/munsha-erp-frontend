import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { DepreciationScreen } from '@/features/accounting/components/screens/DepreciationScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** إثبات إهلاك فترة — feature-owned route content. */
export default function AssetDepreciationPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~depreciation">
          <DepreciationScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
