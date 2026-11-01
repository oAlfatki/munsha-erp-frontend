import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { ContactsLedger } from '@/features/accounting/components/ContactsLedger';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** حركة الأطراف المتنوعة وكشف الحساب — feature-owned route content. */
export default function AccountingContactLedgerPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~contacts-ledger">
          <ContactsLedger />
        </section>
      }
    </FeatureDataScope>
  );
}
