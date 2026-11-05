import { SalesSummaryReport } from '@/features/sales/reports/components/SalesSummaryReport';
/** تقرير المبيعات — feature-owned route content. */
export default function SalesSummaryPage() {
  return (
    <section className="screen-page" data-screen="sales~sales-report">
      <SalesSummaryReport />
    </section>
  );
}
