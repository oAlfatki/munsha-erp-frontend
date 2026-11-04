

import { useHistoricalCostReportView } from '@/features/inventory/hooks/useHistoricalCostReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function HistoricalCostReport() {
 const model=useHistoricalCostReportView({title:"مراجعة تكلفة الصنف التاريخية",summaryColumns:[]});

  return (
    <ReportViewer
      title="مراجعة تكلفة الصنف التاريخية"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
