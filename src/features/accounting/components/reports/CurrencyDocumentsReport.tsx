import { buildCurrencyDocumentsReport } from '@/features/accounting/services/reports/build-currency-documents-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function CurrencyDocumentsReport() {
  return (
    <ReportViewer
      title="مراجعة أرصدة العملات"
      buildData={buildCurrencyDocumentsReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
