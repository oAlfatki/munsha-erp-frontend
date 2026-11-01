import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { CustomerBalancesReport } from '@/features/customers/components/reports/CustomerBalancesReport';
import { useCustomersData } from '@/features/customers/hooks/useCustomersData';
/** تقرير حسابات العملاء — feature-owned route content. */
export default function CustomerBalancesPage() {
  const featureData = useCustomersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="customers~customer-balances">
          <CustomerBalancesReport />
        </section>
      }
    </FeatureDataScope>
  );
}
