import { buildPayrollReport } from '@/features/employees/services/reports/build-payroll-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function PayrollReport() {
  return (
    <ReportViewer
      title="تقرير رواتب الموظفين"
      buildData={buildPayrollReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
