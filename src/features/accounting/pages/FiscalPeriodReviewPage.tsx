import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
import { AnnualSettings } from '@/features/settings/components/AnnualSettings';
/** السنة والفترات المالية — feature-owned route content. */
export default function FiscalPeriodReviewPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~periods">
          <AnnualSettings isConnection={false} />
        </section>
      }
    </FeatureDataScope>
  );
}
