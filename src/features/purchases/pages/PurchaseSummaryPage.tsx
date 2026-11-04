import { PurchaseSummaryReport } from '@/features/purchases/components/reports/PurchaseSummaryReport';
/** تقرير المشتريات — feature-owned route content. */
export default function PurchaseSummaryPage() {
  return (
    <section className="screen-page" data-screen="purchases~purchase-report">
      <PurchaseSummaryReport />
    </section>
  );
}
