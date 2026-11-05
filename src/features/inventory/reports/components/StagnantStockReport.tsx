import { useStagnantStockReportView } from '@/features/inventory/reports/hooks/useStagnantStockReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function StagnantStockReport() {
  const model = useStagnantStockReportView({ title: 'الأصناف الراكدة', summaryColumns: [5] });

  return (
    <ReportViewer
      title="الأصناف الراكدة"
      model={model}
      summaryColumns={[5]}
      shouldShowFrom={true}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
