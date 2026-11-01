import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import { extras } from '@/features/accounting/services/models/extensions';
export function buildWarehouseTransfersReport(
  workspace: ErpReadModel,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const whs = workspace.warehouses.filter(
    (w) => w.branchId === branch && (!filters.warehouse || w.id === filters.warehouse),
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
      headers: [
        'التاريخ',
        'رقم المستند',
        'الصنف',
        'من المخزن',
        'إلى المخزن',
        'الكمية',
        'القيمة YER',
      ],
      rows: [],
    };
    for (const m of workspace.movements.filter((m) => m.kind === 'تحويل صادر' && within(m.date))) {
      const dest = workspace.movements.find(
        (v) => v.reference === m.reference && v.kind === 'تحويل وارد',
      );
      if (
        !whs.some(
          (warehouse) => warehouse.id === m.warehouseId || warehouse.id === dest?.warehouseId,
        )
      )
        continue;
      reportData.rows.push([
        m.date,
        m.reference,
        names(m.productId),
        workspace.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name || '',
        workspace.warehouses.find((warehouse) => warehouse.id === dest?.warehouseId)?.name || '',
        -m.qty,
        money(-m.value),
      ]);
    }
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
