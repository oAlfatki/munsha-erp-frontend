import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { PurchaseSummaryReport } from '@/features/purchases/components/reports/PurchaseSummaryReport';
import { usePurchasesData } from '@/features/purchases/hooks/usePurchasesData';
/** تقرير المشتريات — feature-owned route content. */
export default function PurchaseSummaryPage() {
  const featureData = usePurchasesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="purchases~purchase-report">
          <PurchaseSummaryReport />
        </section>
      }
    </FeatureDataScope>
  );
}
