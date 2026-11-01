import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { StockAdjustmentsReport } from '@/features/inventory/components/reports/StockAdjustmentsReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** قائمة تسويات المخزون — feature-owned route content. */
export default function StockAdjustmentHistoryPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~adjustments">
          <StockAdjustmentsReport />
        </section>
      }
    </FeatureDataScope>
  );
}
