import { buildTaxReport } from '@/features/accounting/services/reports/build-tax-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function TaxReport() {
  return (
    <ReportViewer
      title="تقرير الضرائب"
      buildData={buildTaxReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
