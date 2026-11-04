import { usePayrollReportView } from '@/features/employees/hooks/usePayrollReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function PayrollReport() {
  const model = usePayrollReportView({ title: 'تقرير رواتب الموظفين', summaryColumns: [] });

  return (
    <ReportViewer
      title="تقرير رواتب الموظفين"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
