import { OpeningAccounts } from '@/features/accounting/accounts/components/OpeningAccounts';

/** إضافة الأرصدة الافتتاحية — feature-owned route content. */

export default function OpeningAccountBalancesPage() {

  return (
    <section className="screen-page" data-screen="accounts~opening">
      <OpeningAccounts />
    </section>
  );
}
