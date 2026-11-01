import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Accounting } from '@/features/accounting/components/Accounting';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
export default function AccountingOverviewPage() {
  const featureData = useAccountingData();

  return <FeatureDataScope data={featureData}>{<Accounting />}</FeatureDataScope>;
}
