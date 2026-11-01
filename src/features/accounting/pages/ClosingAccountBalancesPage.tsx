import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { ClosingAccountBalancesScreen } from '@/features/accounting/components/screens/ClosingAccountBalancesScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** الحسابات في الفترة المنتهية — feature-owned route content. */
export default function ClosingAccountBalancesPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~end-balances">
          <ClosingAccountBalancesScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
