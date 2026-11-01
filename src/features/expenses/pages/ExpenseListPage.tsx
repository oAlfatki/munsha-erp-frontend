import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Expenses } from '@/features/expenses/components/Expenses';
import { useExpensesData } from '@/features/expenses/hooks/useExpensesData';
/** قائمة المصروفات — feature-owned route content. */
export default function ExpenseListPage() {
  const featureData = useExpensesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="expenses~expense-list">
          <Expenses mode="list" />
        </section>
      }
    </FeatureDataScope>
  );
}
