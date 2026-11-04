import { StockCountScreen } from '@/features/inventory/components/screens/StockCountScreen';
/** الجرد الفعلي — feature-owned route content. */
export default function StockCountPage() {
  return (
    <section className="screen-page" data-screen="inventory~count">
      <StockCountScreen />
    </section>
  );
}
