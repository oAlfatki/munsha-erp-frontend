import { CustomerBalancesReport } from '@/features/customers/components/reports/CustomerBalancesReport';
/** تقرير حسابات العملاء — feature-owned route content. */
export default function CustomerBalancesPage() {
  

  return (
    <section className="screen-page" data-screen="customers~customer-balances">
          <CustomerBalancesReport />
        </section>
  );
}
