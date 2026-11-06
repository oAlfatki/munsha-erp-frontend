import { PurchaseSummaryReport } from '@/features/purchases/reports/components/PurchaseSummaryReport';

/** تقرير المشتريات — feature-owned route content. */

export default function PurchaseSummaryPage() {

  return (
    <section className="screen-page" data-screen="purchases~purchase-report">
      <PurchaseSummaryReport />
    </section>
  );
}
