import { StockDocuments } from '@/features/inventory/components/StockDocuments';
/** إضافة أصناف بداية المدة — feature-owned route content. */
export default function OpeningStockPage() {
  

  return (
    <section className="screen-page" data-screen="inventory~opening-stock">
          <StockDocuments kind="opening" />
        </section>
  );
}
