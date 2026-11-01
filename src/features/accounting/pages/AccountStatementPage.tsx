import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { AccountStatement } from '@/features/accounting/components/Statement';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** كشف حساب — feature-owned route content. */
export default function AccountStatementPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~statement">
          <AccountStatement />
        </section>
      }
    </FeatureDataScope>
  );
}
