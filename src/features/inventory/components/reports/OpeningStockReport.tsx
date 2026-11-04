

import { useOpeningStockReportView } from '@/features/inventory/hooks/useOpeningStockReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function OpeningStockReport() {
 const model=useOpeningStockReportView({title:"تقرير أصناف بداية المدة",summaryColumns:[5]});

  return (
    <ReportViewer
      title="تقرير أصناف بداية المدة"
      model={model}
      summaryColumns={[5]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={true}
    />
  );
}
