import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { WarehouseDirectory } from '@/features/inventory/components/screens/WarehouseDirectory';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** قائمة المخازن — feature-owned route content. */
export default function WarehouseListPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~warehouses">
          <WarehouseDirectory />
        </section>
      }
    </FeatureDataScope>
  );
}
