import { buildEmployeeAdvancesReport } from '@/features/employees/services/reports/build-employee-advances-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function EmployeeAdvancesReport() {
  return (
    <ReportViewer
      title="تقرير مسحوبات الموظفين"
      buildData={buildEmployeeAdvancesReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
