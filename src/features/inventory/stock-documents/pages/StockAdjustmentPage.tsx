import { StockDocuments } from '@/features/inventory/stock-documents/components/StockDocuments';

/** فاتورة تسوية المخزون — feature-owned route content. */

export default function StockAdjustmentPage() {

  return (
    <section className="screen-page" data-screen="inventory~adjustment">
      <StockDocuments kind="adjustment" />
    </section>
  );
}
