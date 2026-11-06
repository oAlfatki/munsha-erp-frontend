import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildAccountMappingReportContext } from '@/features/financial/types/read-models/BuildAccountMappingReportContext';
import { allAccounts } from '@/features/ledger/public';

export function buildAccountMappingReport(
  workspace: BuildAccountMappingReportContext,
  branch: string,
  filters: Filters,
): ReportData {

  const at = workspace.entries.filter(
    (entry) => entry.branchId === branch && (!filters.to || entry.date <= filters.to),
  );
  let reportData: ReportData;
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
      note: 'الربط قائم على تصنيف الحساب إلى الأصول والالتزامات والملكية والدخل والمصروف. حساب مجمع الإهلاك أصل مقابل بقيمة سالبة.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
