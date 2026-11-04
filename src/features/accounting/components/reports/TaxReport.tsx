import { useTaxReportView } from '@/features/accounting/hooks/useTaxReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function TaxReport() {
  const model = useTaxReportView({ title: 'تقرير الضرائب', summaryColumns: [] });

  return (
    <ReportViewer
      title="تقرير الضرائب"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
