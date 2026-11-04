import { PriceList } from '@/features/sales/components/pricing/ItemPricing';
/** تسعيرة الأصناف — feature-owned route content. */
export default function SalesItemPricingPage() {
  return (
    <section className="screen-page" data-screen="inventory~prices">
      <PriceList />
    </section>
  );
}
