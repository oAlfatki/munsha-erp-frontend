import { ClosingStockScreen } from '@/features/inventory/closing-stock/components/screens/ClosingStockScreen';

/** تقرير مخزون آخر المدة — feature-owned route content. */

export default function ClosingStockPage() {

  return (
    <section className="screen-page" data-screen="inventory~end-stock">
      <ClosingStockScreen />
    </section>
  );
}
