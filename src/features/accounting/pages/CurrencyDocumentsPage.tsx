import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { CurrencyDocumentsReport } from '@/features/accounting/components/reports/CurrencyDocumentsReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** مراجعة أرصدة العملات — feature-owned route content. */
export default function CurrencyDocumentsPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~fx">
          <CurrencyDocumentsReport />
        </section>
      }
    </FeatureDataScope>
  );
}
