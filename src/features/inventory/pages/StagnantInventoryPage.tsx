import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { StagnantStockReport } from '@/features/inventory/components/reports/StagnantStockReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** الأصناف الراكدة — feature-owned route content. */
export default function StagnantInventoryPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~stagnant">
          <StagnantStockReport />
        </section>
      }
    </FeatureDataScope>
  );
}
