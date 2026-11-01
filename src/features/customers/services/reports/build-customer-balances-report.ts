import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
export function buildCustomerBalancesReport(
  workspace: ErpReadModel,
  branch: string,
  filters: Filters,
): ReportData {
  const at = workspace.entries.filter(
    (entry) => entry.branchId === branch && (!filters.to || entry.date <= filters.to),
  );
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: ['اسم الحساب', 'العملة الأساسية', 'مدين', 'دائن', 'الرصيد', 'الحالة'],
      rows: workspace.parties
        .filter((party) => party.kind === 'customer')
        .map((party) => {
          const ls = at
            .flatMap((entry) => entry.lines)
            .filter(
              (journalLine) => journalLine.account === '130' && journalLine.partyId === party.id,
            );
          const dr = money(ls.reduce((n, journalLine) => n + journalLine.debit, 0));
          const cr = money(ls.reduce((n, journalLine) => n + journalLine.credit, 0));
          return [
            party.name,
            'YER',
            dr,
            cr,
            money(Math.abs(dr - cr)),
            dr > cr ? 'مدين' : dr < cr ? 'دائن' : 'متزن',
          ];
        }),
      note: 'حركة الحسابات حتى التاريخ المحدد، بالعملة الأساسية وفق قيود المستندات. الأرصدة موحدة للمنشأة في دليل الأطراف، والحركات هنا للفرع المختار فقط.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
