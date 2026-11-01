import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { BalanceSheet } from '@/features/financial/components/screens/BalanceSheet';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
/** قائمة المركز المالي — feature-owned route content. */
export default function BalanceSheetScreenBalanceSheetPage() {
  const featureData = useFinancialData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="financial~balance-sheet">
          <BalanceSheet />
        </section>
      }
    </FeatureDataScope>
  );
}
