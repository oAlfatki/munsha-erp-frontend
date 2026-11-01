import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { InventoryCost } from '@/features/inventory/components/InventoryCost';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** تقرير تكلفة المخزون — feature-owned route content. */
export default function InventoryValuationPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~cost">
          <InventoryCost />
        </section>
      }
    </FeatureDataScope>
  );
}
