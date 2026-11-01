import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { IncomeStatement } from '@/features/financial/components/screens/IncomeStatement';
import { useFinancialData } from '@/features/financial/hooks/useFinancialData';
export default function FinancialOverviewPage() {
  const featureData = useFinancialData();

  return <FeatureDataScope data={featureData}>{<IncomeStatement />}</FeatureDataScope>;
}
