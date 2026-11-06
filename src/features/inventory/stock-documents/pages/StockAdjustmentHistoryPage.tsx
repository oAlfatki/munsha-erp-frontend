import { StockAdjustmentsReport } from '@/features/inventory/reports/components/StockAdjustmentsReport';

/** قائمة تسويات المخزون — feature-owned route content. */

export default function StockAdjustmentHistoryPage() {

  return (
    <section className="screen-page" data-screen="inventory~adjustments">
      <StockAdjustmentsReport />
    </section>
  );
}
