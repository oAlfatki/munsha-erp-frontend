import type {BuildRecognizedExpensesReportContext} from '@/features/expenses/types/read-models/BuildRecognizedExpensesReportContext';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
export function buildRecognizedExpensesReport(
  workspace: BuildRecognizedExpensesReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const es = workspace.entries.filter((entry) => entry.branchId === branch && within(entry.date));
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: ['التاريخ', 'المستند', 'البيان', 'مصروف YER', 'مستحق / استهلاك'],
      rows: es
        .filter((entry) => entry.lines.some((journalLine) => journalLine.account === '510'))
        .map((entry) => [
          entry.date,
          entry.reference,
          entry.description,
          money(
            entry.lines
              .filter((journalLine) => journalLine.account === '510')
              .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
          ),
          entry.lines.some((journalLine) => journalLine.account === '230')
            ? 'مستحق'
            : entry.lines.some((journalLine) => journalLine.account === '160')
              ? 'استهلاك مقدم'
              : 'نقدي',
        ]),
    };
    reportData.total = money(reportData.rows.reduce((n, v) => n + Number(v[3]), 0));
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
    if (reportData.total !== undefined)
      reportData.total = money(reportData.rows.reduce((n, row) => n + Number(row[3]), 0));
  }
  return reportData;
}
