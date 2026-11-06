import { useStockAdjustmentsReportView } from '@/features/inventory/reports/hooks/useStockAdjustmentsReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function StockAdjustmentsReport() {
  const model = useStockAdjustmentsReportView({
    title: 'قائمة تسويات المخزون',
    summaryColumns: [],
  });

  return (
    <ReportViewer
      title="قائمة تسويات المخزون"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
