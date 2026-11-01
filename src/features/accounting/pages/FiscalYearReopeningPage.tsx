import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { FiscalYearReopening } from '@/features/accounting/components/FiscalYearReopening';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
export default function FiscalYearReopeningPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~reopen">
          <FiscalYearReopening />
        </section>
      }
    </FeatureDataScope>
  );
}
