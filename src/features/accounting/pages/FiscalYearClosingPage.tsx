import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
import { AnnualSettings } from '@/features/settings/components/AnnualSettings';
/** مراجعة إقفال السنة والفترة — feature-owned route content. */
export default function FiscalYearClosingPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~close">
          <AnnualSettings isConnection={false} />
        </section>
      }
    </FeatureDataScope>
  );
}
