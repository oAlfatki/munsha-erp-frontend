import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Catalog } from '@/features/inventory/components/Catalog';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
export default function ProductListPage() {
  const featureData = useInventoryData();

  return <FeatureDataScope data={featureData}>{<Catalog />}</FeatureDataScope>;
}
