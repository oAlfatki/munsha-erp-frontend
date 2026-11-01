import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Expenses } from '@/features/expenses/components/Expenses';
import { useExpensesData } from '@/features/expenses/hooks/useExpensesData';
/** تقارير المصروفات — feature-owned route content. */
export default function ExpenseReportPage() {
  const featureData = useExpensesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="expenses~expense-report">
          <Expenses mode="report" />
        </section>
      }
    </FeatureDataScope>
  );
}
