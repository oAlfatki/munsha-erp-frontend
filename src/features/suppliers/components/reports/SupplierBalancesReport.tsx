import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
import { buildSupplierBalancesReport } from '@/features/suppliers/services/reports/build-supplier-balances-report';
const getAmount = (rows: (string | number)[][]) =>
  money(rows.reduce((n, r) => n + Number(r[2]) - Number(r[3]), 0));
const extraTotals = (rows: (string | number)[][]): [string, string][] => {
  const net = getAmount(rows);
  return [
    ['صافي الرصيد YER', fmt(Math.abs(net))],
    ['الحالة', net > 0 ? 'مدين' : net < 0 ? 'دائن' : 'متزن'],
  ];
};
export function SupplierBalancesReport() {
  return (
    <ReportViewer
      title="تقرير حسابات الموردين"
      buildData={buildSupplierBalancesReport}
      summaryColumns={[2, 3]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
      getAmount={getAmount}
      extraTotals={extraTotals}
    />
  );
}
