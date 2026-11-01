import { buildHistoricalCostReport } from '@/features/inventory/services/reports/build-historical-cost-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function HistoricalCostReport() {
  return (
    <ReportViewer
      title="مراجعة تكلفة الصنف التاريخية"
      buildData={buildHistoricalCostReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
