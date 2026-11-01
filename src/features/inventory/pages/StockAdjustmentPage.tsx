import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { StockDocuments } from '@/features/inventory/components/StockDocuments';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** فاتورة تسوية المخزون — feature-owned route content. */
export default function StockAdjustmentPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~adjustment">
          <StockDocuments kind="adjustment" />
        </section>
      }
    </FeatureDataScope>
  );
}
