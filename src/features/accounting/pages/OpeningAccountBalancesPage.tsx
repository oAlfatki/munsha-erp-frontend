import { OpeningAccounts } from '@/features/accounting/components/OpeningAccounts';
/** إضافة الأرصدة الافتتاحية — feature-owned route content. */
export default function OpeningAccountBalancesPage() {
  

  return (
    <section className="screen-page" data-screen="accounts~opening">
          <OpeningAccounts />
        </section>
  );
}
