import { useAccountMappingReportView } from '@/features/financial/hooks/useAccountMappingReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function AccountMappingReport() {
  const model = useAccountMappingReportView({
    title: 'ربط الحسابات بالقوائم المالية',
    summaryColumns: [3, 4],
  });

  return (
    <ReportViewer
      title="ربط الحسابات بالقوائم المالية"
      model={model}
      summaryColumns={[3, 4]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
    />
  );
}
