import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Expenses } from '@/features/expenses/components/Expenses';
import { useExpensesData } from '@/features/expenses/hooks/useExpensesData';
export default function ExpenseOverviewPage() {
  const featureData = useExpensesData();

  return <FeatureDataScope data={featureData}>{<Expenses />}</FeatureDataScope>;
}
