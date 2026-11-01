import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { AccountMappingReport } from '@/features/financial/components/reports/AccountMappingReport';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** ربط الحسابات بالقوائم المالية — feature-owned route content. */
export default function FinancialAccountMappingPage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~mapping">
          <AccountMappingReport />
        </section>
      }
    </FeatureDataScope>
  );
}
