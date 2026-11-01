import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { ClosingStockScreen } from '@/features/inventory/components/screens/ClosingStockScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** تقرير مخزون آخر المدة — feature-owned route content. */
export default function ClosingStockPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~end-stock">
          <ClosingStockScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
