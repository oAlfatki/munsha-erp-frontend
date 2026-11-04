import { EmployeeAdvancesReport } from '@/features/employees/components/reports/EmployeeAdvancesReport';
/** تقرير مسحوبات الموظفين — feature-owned route content. */
export default function EmployeeWithdrawalsPage() {
  return (
    <section className="screen-page" data-screen="employees~withdrawals">
      <EmployeeAdvancesReport />
    </section>
  );
}
