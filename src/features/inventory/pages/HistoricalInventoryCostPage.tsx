import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { HistoricalCostReport } from '@/features/inventory/components/reports/HistoricalCostReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** مراجعة تكلفة الصنف التاريخية — feature-owned route content. */
export default function HistoricalInventoryCostPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~historical-cost">
          <HistoricalCostReport />
        </section>
      }
    </FeatureDataScope>
  );
}
