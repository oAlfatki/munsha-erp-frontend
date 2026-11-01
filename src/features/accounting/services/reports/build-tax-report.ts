import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
export function buildTaxReport(
  workspace: ErpReadModel,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const es = workspace.entries.filter((entry) => entry.branchId === branch && within(entry.date));
  const reportData: ReportData = { headers: [], rows: [] };
  {
    const tax = (account: string) =>
      money(
        es
          .flatMap((entry) => entry.lines)
          .filter((journalLine) => journalLine.account === account)
          .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
      );
    const output = -tax('240');
    const input = tax('165');
    return {
      headers: ['البند', 'المبلغ YER'],
      rows: [
        ['صافي ضريبة المبيعات بعد المرتجعات', output],
        ['صافي ضريبة المشتريات القابلة للاسترداد', input],
        ['صافي الضريبة — موجب مستحق / سالب رصيد', money(output - input)],
      ],
      total: money(output - input),
      note: 'مستندات الفترة والفرع. تقرير حسابي للضريبة القابلة للإعداد؛ لا ينفذ إقرارًا إلكترونيًا أو سدادًا للجهة الضريبية.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
