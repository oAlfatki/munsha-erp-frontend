import { buildAccountMappingReport } from '@/features/financial/services/reports/build-account-mapping-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function AccountMappingReport() {
  return (
    <ReportViewer
      title="ربط الحسابات بالقوائم المالية"
      buildData={buildAccountMappingReport}
      summaryColumns={[3, 4]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
    />
  );
}
