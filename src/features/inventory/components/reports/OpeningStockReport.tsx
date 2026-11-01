import { buildOpeningStockReport } from '@/features/inventory/services/reports/build-opening-stock-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function OpeningStockReport() {
  return (
    <ReportViewer
      title="تقرير أصناف بداية المدة"
      buildData={buildOpeningStockReport}
      summaryColumns={[5]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
