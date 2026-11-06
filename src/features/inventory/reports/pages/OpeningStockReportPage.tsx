import { OpeningStockReport } from '@/features/inventory/reports/components/OpeningStockReport';

/** تقرير أصناف بداية المدة — feature-owned route content. */

export default function OpeningStockReportPage() {

  return (
    <section className="screen-page" data-screen="inventory~opening-stock-report">
      <OpeningStockReport />
    </section>
  );
}
