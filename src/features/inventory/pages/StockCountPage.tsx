import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { StockCountScreen } from '@/features/inventory/components/screens/StockCountScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** الجرد الفعلي — feature-owned route content. */
export default function StockCountPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~count">
          <StockCountScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
