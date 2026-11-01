import { ReportViewer } from '@/features/reports/components/ReportViewer';
import { buildUserAuditReport } from '@/features/users/services/reports/build-user-audit-report';
export function UserAuditReport() {
  return (
    <ReportViewer
      title="حركات المستخدمين"
      buildData={buildUserAuditReport}
      summaryColumns={[]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
