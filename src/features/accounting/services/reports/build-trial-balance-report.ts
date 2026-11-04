import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import type { BuildTrialBalanceReportContext } from '@/features/accounting/types/read-models/BuildTrialBalanceReportContext';
import { allAccounts } from '@/features/ledger/public/extensions';
export function buildTrialBalanceReport(
  workspace: BuildTrialBalanceReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const at = workspace.entries.filter(
    (entry) => entry.branchId === branch && (!filters.to || entry.date <= filters.to),
  );
  let reportData: ReportData = { headers: [], rows: [] };
  {
    const labels: Record<string, string> = {
      asset: 'أصول',
      liability: 'التزامات',
      equity: 'حقوق ملكية',
      revenue: 'إيرادات',
      expense: 'مصروفات',
    };
    reportData = {
      headers: ['رمز الحساب', 'اسم الحساب', 'التصنيف', 'رصيد مدين YER', 'رصيد دائن YER'],
      rows: Object.entries(allAccounts(workspace)).map(([c, a]) => {
        const b = money(
          at
            .flatMap((entry) => entry.lines)
            .filter((journalLine) => journalLine.account === c)
            .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
        );
        return [c, a.name, labels[a.type], Math.max(b, 0), Math.max(-b, 0)];
      }),
      note: 'ميزان تراكمي حتى التاريخ، يشمل الحسابات المضافة. لا يرحل إلى قاعدة جديدة من زر التصدير.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
