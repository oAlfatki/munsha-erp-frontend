import { useCashMovementReportView } from '@/features/accounting/reports/hooks/useCashMovementReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function CashMovementReport() {
  const model = useCashMovementReportView({ title: 'حركة الصندوق', summaryColumns: [3, 4] });

  return (
    <ReportViewer
      title="حركة الصندوق"
      model={model}
      summaryColumns={[3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
