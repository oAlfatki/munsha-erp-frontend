import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { OpeningStockReport } from '@/features/inventory/components/reports/OpeningStockReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** تقرير أصناف بداية المدة — feature-owned route content. */
export default function OpeningStockReportPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~opening-stock-report">
          <OpeningStockReport />
        </section>
      }
    </FeatureDataScope>
  );
}
