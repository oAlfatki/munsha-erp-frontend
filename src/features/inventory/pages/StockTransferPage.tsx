import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { StockDocuments } from '@/features/inventory/components/StockDocuments';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** إضافة فاتورة تحويل مخزني — feature-owned route content. */
export default function StockTransferPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~transfer-document">
          <StockDocuments kind="transfer" />
        </section>
      }
    </FeatureDataScope>
  );
}
