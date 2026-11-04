import { SalesSummaryReport } from '@/features/sales/components/reports/SalesSummaryReport';
/** تقرير المبيعات — feature-owned route content. */
export default function SalesSummaryPage() {
  return (
    <section className="screen-page" data-screen="sales~sales-report">
      <SalesSummaryReport />
    </section>
  );
}
