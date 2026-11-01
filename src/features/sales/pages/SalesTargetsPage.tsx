import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SalesTargets } from '@/features/sales/components/SalesTargets';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
/** أهداف المبيعات ومتابعة الإنجاز — feature-owned route content. */
export default function SalesTargetsPage() {
  const featureData = useSalesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="sales~targets">
          <SalesTargets />
        </section>
      }
    </FeatureDataScope>
  );
}
