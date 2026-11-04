import { VouchersReport } from '@/features/accounting/components/reports/VouchersReport';
/** بحث سندات الصرف والقبض — feature-owned route content. */
export default function VoucherListPage() {
  

  return (
    <section className="screen-page" data-screen="accounts~vouchers">
          <VouchersReport />
        </section>
  );
}
