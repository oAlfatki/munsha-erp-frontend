import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { WarehouseDirectory } from '@/features/inventory/components/screens/WarehouseDirectory';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** إضافة مخزن — feature-owned route content. */
export default function CreateWarehousePage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~warehouses-add">
          <WarehouseDirectory shouldInitiallyAdd />
        </section>
      }
    </FeatureDataScope>
  );
}
