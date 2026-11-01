import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { PriceList } from '@/features/sales/components/pricing/ItemPricing';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
/** تسعيرة الأصناف — feature-owned route content. */
export default function SalesItemPricingPage() {
  const featureData = useSalesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~prices">
          <PriceList />
        </section>
      }
    </FeatureDataScope>
  );
}
