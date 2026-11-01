import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { StockDocuments } from '@/features/inventory/components/StockDocuments';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** إضافة أصناف بداية المدة — feature-owned route content. */
export default function OpeningStockPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~opening-stock">
          <StockDocuments kind="opening" />
        </section>
      }
    </FeatureDataScope>
  );
}
