import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { ProfitByCustomerReport } from '@/features/financial/components/reports/ProfitByCustomerReport';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** الأرباح من العملاء — feature-owned route content. */
export default function CustomerProfitPage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~profit-customers">
          <ProfitByCustomerReport />
        </section>
      }
    </FeatureDataScope>
  );
}
