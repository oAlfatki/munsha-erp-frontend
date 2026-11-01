import { buildStockAdjustmentsReport } from '@/features/inventory/services/reports/build-stock-adjustments-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function StockAdjustmentsReport() {
  return (
    <ReportViewer
      title="قائمة تسويات المخزون"
      buildData={buildStockAdjustmentsReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
