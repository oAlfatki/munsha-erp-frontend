import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { useSupplierBalancesReportView } from '@/features/suppliers/hooks/useSupplierBalancesReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
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
  const model = useSupplierBalancesReportView({
    title: 'تقرير حسابات الموردين',
    summaryColumns: [2, 3],
    getAmount: getAmount,
    extraTotals: extraTotals,
  });

  return (
    <ReportViewer
      title="تقرير حسابات الموردين"
      model={model}
      summaryColumns={[2, 3]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
      getAmount={getAmount}
      extraTotals={extraTotals}
    />
  );
}
