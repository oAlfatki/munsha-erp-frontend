import { buildReorderReport } from '@/features/inventory/services/reports/build-reorder-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function ReorderReport() {
  return (
    <ReportViewer
      title="أصناف بلغت حد الطلب"
      buildData={buildReorderReport}
      summaryColumns={[5]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
