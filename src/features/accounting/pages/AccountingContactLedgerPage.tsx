import { ContactsLedger } from '@/features/accounting/components/ContactsLedger';
/** حركة الأطراف المتنوعة وكشف الحساب — feature-owned route content. */
export default function AccountingContactLedgerPage() {
  return (
    <section className="screen-page" data-screen="accounts~contacts-ledger">
      <ContactsLedger />
    </section>
  );
}
