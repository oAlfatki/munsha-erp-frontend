import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import type { BuildStockAdjustmentsReportContext } from '@/features/inventory/types/read-models/BuildStockAdjustmentsReportContext';
import { extras } from '@/features/ledger/public/extensions';
export function buildStockAdjustmentsReport(
  workspace: BuildStockAdjustmentsReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const operations = extras(workspace).operations.filter(
    (o) => o.branchId === branch && within(o.date),
  );
  const names = (id: string) =>
    workspace.parties.find((party) => party.id === id)?.name ||
    workspace.employees.find((employee) => employee.id === id)?.name ||
    extras(workspace).records.assets?.find((a) => a.id === id)?.name ||
    workspace.products.find((product) => product.id === id)?.name ||
    id;
  let reportData: ReportData = { headers: [], rows: [] };
  {
    const kinds = ['count', 'adjustment'];
    reportData = {
      headers: [
        'التاريخ',
        'المستند',
        'الاسم',
        'نوع الحركة',
        'الفترة / الكمية',
        'القيمة YER',
        'الحالة',
      ],
      rows: operations
        .filter((o) => kinds.includes(o.kind))
        .map((o) => [
          o.date,
          o.reference,
          names(o.subject),
          o.kind === 'payroll'
            ? 'إثبات راتب'
            : o.kind === 'salaryPayment'
              ? 'صرف راتب'
              : o.kind === 'count'
                ? 'محضر عد'
                : o.kind === 'adjustment'
                  ? 'تسوية'
                  : 'سلفة',
          o.period || o.qty || '—',
          o.amount,
          o.kind === 'count' ? 'دون أثر مخزني' : o.paid ? 'مسدد' : 'محفوظ',
        ]),
      note: '',
    };
    reportData.rows.push(
      ...(workspace.stockDocuments || [])
        .filter((d) => d.kind === 'adjustment' && d.branchId === branch && within(d.date))
        .map((d) => [
          d.date,
          d.reference,
          d.note || 'تسوية مخزون',
          d.direction === 'shortage' ? 'عجز' : 'زيادة',
          d.lines.length,
          d.total,
          d.status === 'final' ? 'نهائي' : 'مسودة',
        ]),
    );
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
