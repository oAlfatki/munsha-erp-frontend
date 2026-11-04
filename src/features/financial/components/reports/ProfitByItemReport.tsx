import { useProfitByItemReportView } from '@/features/financial/hooks/useProfitByItemReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function ProfitByItemReport() {
  const model = useProfitByItemReportView({
    title: 'الأرباح من الأصناف',
    summaryColumns: [2, 3, 4],
  });

  return (
    <ReportViewer
      title="الأرباح من الأصناف"
      model={model}
      summaryColumns={[2, 3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
