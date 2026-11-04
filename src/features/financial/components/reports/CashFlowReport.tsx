import { useCashFlowReportView } from '@/features/financial/hooks/useCashFlowReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function CashFlowReport() {
  const model = useCashFlowReportView({ title: 'قائمة التدفقات النقدية', summaryColumns: [] });

  return (
    <ReportViewer
      title="قائمة التدفقات النقدية"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
