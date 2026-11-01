import { buildCashFlowReport } from '@/features/financial/services/reports/build-cash-flow-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function CashFlowReport() {
  return (
    <ReportViewer
      title="قائمة التدفقات النقدية"
      buildData={buildCashFlowReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
