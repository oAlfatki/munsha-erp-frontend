import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import { isCashLine } from "@/features/accounting/public/cash";
import type { BuildCashMovementReportContext } from '@/features/accounting/types/read-models/BuildCashMovementReportContext';
export function buildCashMovementReport(
  workspace: BuildCashMovementReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const es = workspace.entries.filter((entry) => entry.branchId === branch && within(entry.date));
  let reportData: ReportData = { headers: [], rows: [] };
  {
    const selected = es.filter((entry) =>
      entry.lines.some((journalLine) => isCashLine(workspace, branch, journalLine)),
    );
    reportData = {
      headers: ['التاريخ', 'المستند', 'البيان', 'مدين YER', 'دائن YER'],
      rows: selected.map((entry) => {
        const ls = entry.lines.filter((journalLine) => isCashLine(workspace, branch, journalLine));
        return [
          entry.date,
          entry.reference,
          entry.description,
          money(ls.reduce((n, journalLine) => n + journalLine.debit, 0)),
          money(ls.reduce((n, journalLine) => n + journalLine.credit, 0)),
        ];
      }),
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
