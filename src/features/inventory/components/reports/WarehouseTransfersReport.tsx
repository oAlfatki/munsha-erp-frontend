import { useWarehouseTransfersReportView } from '@/features/inventory/hooks/useWarehouseTransfersReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function WarehouseTransfersReport() {
  const model = useWarehouseTransfersReportView({
    title: 'فواتير التحويل بين المخازن',
    summaryColumns: [],
  });

  return (
    <ReportViewer
      title="فواتير التحويل بين المخازن"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
