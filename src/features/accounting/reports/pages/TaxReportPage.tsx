import { TaxReport } from '@/features/accounting/reports/components/TaxReport';

/** تقرير الضرائب — feature-owned route content. */

export default function TaxReportPage() {

  return (
    <section className="screen-page" data-screen="accounts~tax-report">
      <TaxReport />
    </section>
  );
}
