import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SalesSummaryReport } from '@/features/sales/components/reports/SalesSummaryReport';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
/** تقرير المبيعات — feature-owned route content. */
export default function SalesSummaryPage() {
  const featureData = useSalesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="sales~sales-report">
          <SalesSummaryReport />
        </section>
      }
    </FeatureDataScope>
  );
}
