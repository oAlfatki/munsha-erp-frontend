import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { TaxReport } from '@/features/accounting/components/reports/TaxReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** تقرير الضرائب — feature-owned route content. */
export default function TaxReportPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~tax-report">
          <TaxReport />
        </section>
      }
    </FeatureDataScope>
  );
}
