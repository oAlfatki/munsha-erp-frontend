import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { OpeningAccounts } from '@/features/accounting/components/OpeningAccounts';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** إضافة الأرصدة الافتتاحية — feature-owned route content. */
export default function OpeningAccountBalancesPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~opening">
          <OpeningAccounts />
        </section>
      }
    </FeatureDataScope>
  );
}
