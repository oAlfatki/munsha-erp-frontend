import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { PayrollReport } from '@/features/employees/components/reports/PayrollReport';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
/** تقرير رواتب الموظفين — feature-owned route content. */
export default function SalaryReportPage() {
  const featureData = useEmployeesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="employees~salary-report">
          <PayrollReport />
        </section>
      }
    </FeatureDataScope>
  );
}
