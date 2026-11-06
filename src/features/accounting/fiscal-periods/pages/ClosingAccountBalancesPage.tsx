import { ClosingAccountBalancesScreen } from '@/features/accounting/fiscal-periods/components/screens/ClosingAccountBalancesScreen';

/** الحسابات في الفترة المنتهية — feature-owned route content. */

export default function ClosingAccountBalancesPage() {

  return (
    <section className="screen-page" data-screen="accounts~end-balances">
      <ClosingAccountBalancesScreen />
    </section>
  );
}
