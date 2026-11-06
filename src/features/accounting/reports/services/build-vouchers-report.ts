import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildVouchersReportContext } from '@/features/accounting/reports/types/read-models/BuildVouchersReportContext';
import { isCashLine } from '@/features/ledger/public';

export function buildVouchersReport(
  workspace: BuildVouchersReportContext,
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
        (!filters.voucherKind ||
          (filters.voucherKind === 'payment'
            ? entry.reference.startsWith('PAY-')
            : entry.reference.startsWith('RCV-'))) &&
        /^(RCV|PAY)-/.test(entry.reference),
    );

    reportData = {
      headers: ['التاريخ', 'المستند', 'نوع السند', 'البيان', 'المبلغ YER'],
      rows: selected.map((entry) => [
        entry.date,
        entry.reference,
        entry.reference.startsWith('PAY-') ? 'صرف' : 'قبض',
        entry.description,
        money(
          entry.lines
            .filter((journalLine) => isCashLine(workspace, branch, journalLine))
            .reduce((n, journalLine) => n + journalLine.debit + journalLine.credit, 0),
        ),
      ]),
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
