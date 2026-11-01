import { buildProfitByItemReport } from '@/features/financial/services/reports/build-profit-by-item-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function ProfitByItemReport() {
  return (
    <ReportViewer
      title="الأرباح من الأصناف"
      buildData={buildProfitByItemReport}
      summaryColumns={[2, 3, 4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
    />
  );
}
