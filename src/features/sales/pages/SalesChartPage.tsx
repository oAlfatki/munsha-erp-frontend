import { SalesChartReport } from '@/features/sales/components/reports/SalesChartReport';
/** الرسم البياني لحركة المبيعات — feature-owned route content. */
export default function SalesChartPage() {
  

  return (
    <section className="screen-page" data-screen="sales~sales-chart">
          <SalesChartReport />
        </section>
  );
}
