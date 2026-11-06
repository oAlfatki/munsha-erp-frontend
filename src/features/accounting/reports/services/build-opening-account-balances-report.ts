import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildOpeningAccountBalancesReportContext } from '@/features/accounting/reports/types/read-models/BuildOpeningAccountBalancesReportContext';

export function buildOpeningAccountBalancesReport(
  workspace: BuildOpeningAccountBalancesReportContext,
  branch: string,
  filters: Filters,
): ReportData {

  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);

  const es = workspace.entries.filter((entry) => entry.branchId === branch && within(entry.date));
  let reportData: ReportData;
  {
    const selected = es.filter(
      (entry) =>
        /^(OPEN|FWD-ACC)-/.test(entry.reference) &&
        !workspace.stockDocuments?.some(
          (d) => d.reference === entry.reference && d.openingScope === 'stock',
        ),
    );
    reportData = {
      headers: ['التاريخ', 'المستند', 'البيان', 'مدين YER', 'دائن YER'],
      rows: selected.map((entry) => {
        const ls = entry.lines;
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
