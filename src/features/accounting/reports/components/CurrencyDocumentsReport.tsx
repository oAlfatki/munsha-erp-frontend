import { useCurrencyDocumentsReportView } from '@/features/accounting/reports/hooks/useCurrencyDocumentsReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';

export function CurrencyDocumentsReport() {

  const model = useCurrencyDocumentsReportView({
    title: 'مراجعة أرصدة العملات',
    summaryColumns: [],
  });

  return (
    <ReportViewer
      title="مراجعة أرصدة العملات"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
