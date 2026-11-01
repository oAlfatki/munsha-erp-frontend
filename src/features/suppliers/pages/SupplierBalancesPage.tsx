import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SupplierBalancesReport } from '@/features/suppliers/components/reports/SupplierBalancesReport';
import { useSuppliersData } from '@/features/suppliers/hooks/useSuppliersData';
/** تقرير حسابات الموردين — feature-owned route content. */
export default function SupplierBalancesPage() {
  const featureData = useSuppliersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="suppliers~supplier-balances">
          <SupplierBalancesReport />
        </section>
      }
    </FeatureDataScope>
  );
}
