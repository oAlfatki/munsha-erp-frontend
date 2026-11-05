import { OpeningAccountBalancesReport } from '@/features/accounting/reports/components/OpeningAccountBalancesReport';
/** تقرير الأرصدة الافتتاحية — feature-owned route content. */
export default function OpeningAccountBalancesReportPage() {
  return (
    <section className="screen-page" data-screen="accounts~opening-report">
      <OpeningAccountBalancesReport />
    </section>
  );
}
