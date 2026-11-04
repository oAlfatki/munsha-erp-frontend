import { useUserAuditReportView } from '@/features/users/hooks/useUserAuditReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function UserAuditReport() {
  const model = useUserAuditReportView({ title: 'حركات المستخدمين', summaryColumns: [] });

  return (
    <ReportViewer
      title="حركات المستخدمين"
      model={model}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
