import { buildCashMovementReport } from '@/features/accounting/services/reports/build-cash-movement-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function CashMovementReport() {
  return (
    <ReportViewer
      title="حركة الصندوق"
      buildData={buildCashMovementReport}
      summaryColumns={[3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
