import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { WarehouseTransfersReport } from '@/features/inventory/components/reports/WarehouseTransfersReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** فواتير التحويل بين المخازن — feature-owned route content. */
export default function StockTransferHistoryPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~transfers">
          <WarehouseTransfersReport />
        </section>
      }
    </FeatureDataScope>
  );
}
