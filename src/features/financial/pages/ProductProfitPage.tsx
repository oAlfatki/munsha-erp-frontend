import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { ProfitByItemReport } from '@/features/financial/components/reports/ProfitByItemReport';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** الأرباح من الأصناف — feature-owned route content. */
export default function ProductProfitPage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~profit-items">
          <ProfitByItemReport />
        </section>
      }
    </FeatureDataScope>
  );
}
