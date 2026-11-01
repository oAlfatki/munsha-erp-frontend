import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { VouchersReport } from '@/features/accounting/components/reports/VouchersReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** بحث سندات الصرف والقبض — feature-owned route content. */
export default function VoucherListPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~vouchers">
          <VouchersReport />
        </section>
      }
    </FeatureDataScope>
  );
}
