import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { CashMovementReport } from '@/features/accounting/components/reports/CashMovementReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** حركة الصندوق — feature-owned route content. */
export default function CashMovementPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~cash-movement">
          <CashMovementReport />
        </section>
      }
    </FeatureDataScope>
  );
}
