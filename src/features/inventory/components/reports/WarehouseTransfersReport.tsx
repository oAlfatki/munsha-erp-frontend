import { buildWarehouseTransfersReport } from '@/features/inventory/services/reports/build-warehouse-transfers-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function WarehouseTransfersReport() {
  return (
    <ReportViewer
      title="فواتير التحويل بين المخازن"
      buildData={buildWarehouseTransfersReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
