import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { IncomeStatement } from '@/features/financial/components/screens/IncomeStatement';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** قائمة الدخل — feature-owned route content. */
export default function IncomeStatementScreenIncomePage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~income">
          <IncomeStatement />
        </section>
      }
    </FeatureDataScope>
  );
}
