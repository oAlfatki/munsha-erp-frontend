import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { OpeningAccountBalancesReport } from '@/features/accounting/components/reports/OpeningAccountBalancesReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** تقرير الأرصدة الافتتاحية — feature-owned route content. */
export default function OpeningAccountBalancesReportPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~opening-report">
          <OpeningAccountBalancesReport />
        </section>
      }
    </FeatureDataScope>
  );
}
