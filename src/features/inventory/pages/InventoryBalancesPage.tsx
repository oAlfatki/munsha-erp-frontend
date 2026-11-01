import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Inventory } from '@/features/inventory/components/Inventory';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
export default function InventoryBalancesPage() {
  const featureData = useInventoryData();

  return <FeatureDataScope data={featureData}>{<Inventory />}</FeatureDataScope>;
}
