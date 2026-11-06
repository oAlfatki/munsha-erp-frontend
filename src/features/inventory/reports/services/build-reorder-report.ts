import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildReorderReportContext } from '@/features/inventory/reports/types/read-models/BuildReorderReportContext';
import { systemSettings } from '@/features/organization/public';

export function buildReorderReport(
  workspace: BuildReorderReportContext,
  branch: string,
  filters: Filters,
): ReportData {

  const whs = workspace.warehouses.filter(
    (w) => w.branchId === branch && (!filters.warehouse || w.id === filters.warehouse),
  );
  const moves = workspace.movements.filter(
    (m) =>
      whs.some((warehouse) => warehouse.id === m.warehouseId) &&
      (!filters.to || m.date <= filters.to),
  );
  let reportData: ReportData;
  {
    reportData = {
      headers: [
        'الصنف',
        'المخزن',
        'الوحدة الأساسية',
        'الكمية',
        'متوسط التكلفة',
        'القيمة YER',
        'حد الطلب',
      ],
      rows: [],
    };
    for (const product of workspace.products)
      for (const w of whs) {
        const ms = moves.filter(
          (m) => m.productId === product.id && m.warehouseId === w.id && true,
        );
        const qty = +ms.reduce((n, m) => n + m.qty, 0).toFixed(6);
        const value = money(ms.reduce((n, m) => n + m.value, 0));
        if (!systemSettings(workspace).inventory.alert || !product.alert || qty > product.min)
          continue;
        reportData.rows.push([
          product.name,
          w.name,
          product.units.at(-1)!.name,
          qty,
          qty ? money(value / qty) : 0,
          value,
          product.min,
        ]);
      }
    reportData.total = money(reportData.rows.reduce((n, v) => n + Number(v[5]), 0));
    reportData.note =
      'الأرصدة تراكمية حتى التاريخ، من سجل الحركات؛ ليست مجموع الحركات داخل المدى فقط.';
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
    if (reportData.total !== undefined)
      reportData.total = money(reportData.rows.reduce((n, row) => n + Number(row[5]), 0));
  }
  return reportData;
}
