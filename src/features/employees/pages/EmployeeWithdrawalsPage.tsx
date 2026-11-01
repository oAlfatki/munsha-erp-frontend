import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { EmployeeAdvancesReport } from '@/features/employees/components/reports/EmployeeAdvancesReport';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
/** تقرير مسحوبات الموظفين — feature-owned route content. */
export default function EmployeeWithdrawalsPage() {
  const featureData = useEmployeesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="employees~withdrawals">
          <EmployeeAdvancesReport />
        </section>
      }
    </FeatureDataScope>
  );
}
