import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SalesChartReport } from '@/features/sales/components/reports/SalesChartReport';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
/** الرسم البياني لحركة المبيعات — feature-owned route content. */
export default function SalesChartPage() {
  const featureData = useSalesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="sales~sales-chart">
          <SalesChartReport />
        </section>
      }
    </FeatureDataScope>
  );
}
