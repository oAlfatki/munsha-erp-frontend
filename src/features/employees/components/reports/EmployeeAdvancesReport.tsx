import { useEmployeeAdvancesReportView } from '@/features/employees/hooks/useEmployeeAdvancesReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';

export function EmployeeAdvancesReport() {

  const model = useEmployeeAdvancesReportView({
    title: 'تقرير مسحوبات الموظفين',
    summaryColumns: [],
  });

  return (
    <ReportViewer
      title="تقرير مسحوبات الموظفين"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
