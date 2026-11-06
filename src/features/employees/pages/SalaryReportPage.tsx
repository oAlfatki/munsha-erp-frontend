import { PayrollReport } from '@/features/employees/components/reports/PayrollReport';

/** تقرير رواتب الموظفين — feature-owned route content. */

export default function SalaryReportPage() {

  return (
    <section className="screen-page" data-screen="employees~salary-report">
      <PayrollReport />
    </section>
  );
}
