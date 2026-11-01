import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { CashFlowReport } from '@/features/financial/components/reports/CashFlowReport';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** قائمة التدفقات النقدية — feature-owned route content. */
export default function CashFlowPage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~cash-flow">
          <CashFlowReport />
        </section>
      }
    </FeatureDataScope>
  );
}
