import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { AssetAcquisitionScreen } from '@/features/accounting/components/screens/AssetAcquisitionScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** إثبات اقتناء أصل — feature-owned route content. */
export default function AssetAcquisitionPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~asset-purchase">
          <AssetAcquisitionScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
