import { buildProfitByCustomerReport } from '@/features/financial/services/reports/build-profit-by-customer-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function ProfitByCustomerReport() {
  return (
    <ReportViewer
      title="الأرباح من العملاء"
      buildData={buildProfitByCustomerReport}
      summaryColumns={[2, 3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
