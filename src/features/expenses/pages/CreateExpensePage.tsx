import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Expenses } from '@/features/expenses/components/Expenses';
import { useExpensesData } from '@/features/expenses/hooks/useExpensesData';
/** إضافة مصروف — feature-owned route content. */
export default function CreateExpensePage() {
  const featureData = useExpensesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="expenses~add">
          <Expenses mode="add" />
        </section>
      }
    </FeatureDataScope>
  );
}
