import { SupplierBalancesReport } from '@/features/suppliers/components/reports/SupplierBalancesReport';
/** تقرير حسابات الموردين — feature-owned route content. */
export default function SupplierBalancesPage() {
  

  return (
    <section className="screen-page" data-screen="suppliers~supplier-balances">
          <SupplierBalancesReport />
        </section>
  );
}
