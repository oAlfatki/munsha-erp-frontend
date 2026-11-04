

import { useProfitByCustomerReportView } from '@/features/financial/hooks/useProfitByCustomerReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function ProfitByCustomerReport() {
 const model=useProfitByCustomerReportView({title:"الأرباح من العملاء",summaryColumns:[2, 3, 4]});

  return (
    <ReportViewer
      title="الأرباح من العملاء"
      model={model}
      summaryColumns={[2, 3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
