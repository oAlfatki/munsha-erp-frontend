import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { ReorderReport } from '@/features/inventory/components/reports/ReorderReport';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
/** أصناف بلغت حد الطلب — feature-owned route content. */
export default function ReorderAlertsPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~reorder">
          <ReorderReport />
        </section>
      }
    </FeatureDataScope>
  );
}
