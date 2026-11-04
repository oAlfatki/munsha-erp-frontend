import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import { extras } from "@/features/accounting/public/extensions";
import type { BuildHistoricalCostReportContext } from '@/features/inventory/types/read-models/BuildHistoricalCostReportContext';
export function buildHistoricalCostReport(
  workspace: BuildHistoricalCostReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const whs = workspace.warehouses.filter(
    (w) => w.branchId === branch && (!filters.warehouse || w.id === filters.warehouse),
  );
  const moves = workspace.movements.filter(
    (m) =>
      whs.some((warehouse) => warehouse.id === m.warehouseId) &&
      (!filters.to || m.date <= filters.to),
  );
  const names = (id: string) =>
    workspace.parties.find((party) => party.id === id)?.name ||
    workspace.employees.find((employee) => employee.id === id)?.name ||
    extras(workspace).records.assets?.find((a) => a.id === id)?.name ||
    workspace.products.find((product) => product.id === id)?.name ||
    id;
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: ['التاريخ', 'المستند', 'الصنف', 'المخزن', 'الحركة', 'الكمية', 'القيمة YER'],
      rows: moves
        .filter((m) => within(m.date))
        .map((m) => [
          m.date,
          m.reference,
          names(m.productId),
          workspace.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name || '',
          m.kind,
          m.qty,
          money(m.value),
        ]),
      note: 'تكلفة وقيمة الحركة المثبتة وقتها، وليست إعادة تسعير بسعر الشراء الحالي.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
