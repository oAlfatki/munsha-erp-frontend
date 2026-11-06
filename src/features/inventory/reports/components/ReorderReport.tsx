import { useReorderReportView } from '@/features/inventory/reports/hooks/useReorderReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';

export function ReorderReport() {

  const model = useReorderReportView({ title: 'أصناف بلغت حد الطلب', summaryColumns: [5] });

  return (
    <ReportViewer
      title="أصناف بلغت حد الطلب"
      model={model}
      summaryColumns={[5]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
