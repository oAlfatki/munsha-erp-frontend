import { buildStagnantStockReport } from '@/features/inventory/services/reports/build-stagnant-stock-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function StagnantStockReport() {
  return (
    <ReportViewer
      title="الأصناف الراكدة"
      buildData={buildStagnantStockReport}
      summaryColumns={[5]}
      shouldShowFrom={true}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
