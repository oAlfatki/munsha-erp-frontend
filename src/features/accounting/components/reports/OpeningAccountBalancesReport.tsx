import { buildOpeningAccountBalancesReport } from '@/features/accounting/services/reports/build-opening-account-balances-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function OpeningAccountBalancesReport() {
  return (
    <ReportViewer
      title="تقرير الأرصدة الافتتاحية"
      buildData={buildOpeningAccountBalancesReport}
      summaryColumns={[3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
