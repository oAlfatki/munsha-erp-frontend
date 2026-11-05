import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import type { BuildExpenseDocumentsReportContext } from '@/features/expenses/types/read-models/BuildExpenseDocumentsReportContext';
import { extras } from '@/features/ledger/public';
export function buildExpenseDocumentsReport(
  workspace: BuildExpenseDocumentsReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const operations = extras(workspace).operations.filter(
    (o) => o.branchId === branch && within(o.date),
  );
  let reportData: ReportData = { headers: [], rows: [] };
  {
    const labels: Record<string, string> = {
      accruedExpense: 'إثبات مصروف مستحق',
      settleExpense: 'سداد مصروف مستحق',
      prepaidExpense: 'مصروف مقدم',
      consumePrepaid: 'استهلاك مصروف مقدم',
    };
    reportData = {
      headers: ['التاريخ', 'المستند', 'البيان', 'المبلغ YER', 'نوع العملية', 'الحالة'],
      rows: [
        ...workspace.expenses
          .filter((expense) => expense.branchId === branch && within(expense.date))
          .map(
            (expense) =>
              [
                expense.date,
                expense.id,
                expense.description,
                expense.amount * expense.rate,
                'مصروف نقدي مباشر',
                'محفوظ',
              ] as (string | number)[],
          ),
        ...operations
          .filter((o) => labels[o.kind])
          .map(
            (o) =>
              [
                o.date,
                o.reference,
                o.note || '—',
                o.amount,
                labels[o.kind],
                o.paid ? 'مسدد' : 'محفوظ',
              ] as (string | number)[],
          ),
      ].sort((a, b) => String(b[0]).localeCompare(String(a[0]))),
      note: 'قائمة مستندات المصروفات والسداد والاستهلاك. لا تجمع مبالغ العمليات كتكلفة واحدة؛ تقرير المصروفات المحاسبي يعرض المصروف المعترف به فقط.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
