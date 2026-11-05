import { useOpeningAccountBalancesReportView } from '@/features/accounting/reports/hooks/useOpeningAccountBalancesReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function OpeningAccountBalancesReport() {
  const model = useOpeningAccountBalancesReportView({
    title: 'تقرير الأرصدة الافتتاحية',
    summaryColumns: [3, 4],
  });

  return (
    <ReportViewer
      title="تقرير الأرصدة الافتتاحية"
      model={model}
      summaryColumns={[3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
