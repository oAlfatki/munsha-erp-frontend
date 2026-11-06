import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildCashFlowReportContext } from '@/features/financial/types/read-models/BuildCashFlowReportContext';
import type { Entry } from '@/features/ledger/public';
import { allAccounts, isCashLine } from '@/features/ledger/public';

export function buildCashFlowReport(
  workspace: BuildCashFlowReportContext,
  branch: string,
  filters: Filters,
): ReportData {

  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);

  const at = workspace.entries.filter(
    (entry) => entry.branchId === branch && (!filters.to || entry.date <= filters.to),
  );

  const cash = (entry: Entry) =>
    money(
      entry.lines
        .filter((journalLine) => isCashLine(workspace, branch, journalLine))
        .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
    );

  const openingEntry = (ref: string) => /^(OPEN|FWD-ACC)-/.test(ref);

  const groups = new Map<
    string,
    {
      receipt: number;
      payment: number;
    }
  >();
  const chart = allAccounts(workspace);
  let opening = 0;
  for (const entry of at) {
    const value = cash(entry);
    if (!value) continue;
    if ((filters.from && entry.date < filters.from) || openingEntry(entry.reference)) {
      opening += value;
      continue;
    }
    if (!within(entry.date)) continue;
    const opposite = entry.lines
      .filter((journalLine) => !isCashLine(workspace, branch, journalLine))
      .map((journalLine) => journalLine.account);
    const labels = new Set(
      opposite.map((code) =>
        code === '170'
          ? 'استثمارية'
          : chart[code]?.type === 'equity'
            ? 'تمويلية'
            : code === '150'
              ? 'تحويلات بين الفروع'
              : ['120', '130', '210', '220', '230', '240', '165'].includes(code) ||
                  ['revenue', 'expense'].includes(chart[code]?.type)
                ? 'تشغيلية'
                : 'غير مصنفة',
      ),
    );
    const label = labels.size === 1 ? [...labels][0] : 'مختلطة — تحتاج مراجعة';
    const g = groups.get(label) || { receipt: 0, payment: 0 };
    g.receipt += Math.max(value, 0);
    g.payment += Math.max(-value, 0);
    groups.set(label, g);
  }
  const net = money([...groups.values()].reduce((n, g) => n + g.receipt - g.payment, 0));
  const closing = money(at.reduce((n, entry) => n + cash(entry), 0));
  return {
    headers: ['البند', 'المقبوضات YER', 'المدفوعات YER', 'الصافي YER'],
    rows: [
      ['رصيد النقد أول الفترة / الأرصدة الافتتاحية', 0, 0, money(opening)],
      ...[...groups].map(([name, g]) => [
        name,
        money(g.receipt),
        money(g.payment),
        money(g.receipt - g.payment),
      ]),
      ['صافي التدفقات', 0, 0, net],
      ['رصيد النقد آخر الفترة', 0, 0, closing],
      ['فرق المطابقة', 0, 0, money(opening + net - closing)],
    ],
    total: net,
    note: 'تدفقات مباشرة من الحسابات النقدية بالعملة الأساسية. التصنيف بحسب الحساب المقابل؛ القيود متعددة التصنيفات تظهر للمراجعة دون إسناد افتراضي. الأرصدة الافتتاحية مستبعدة من التدفقات، والتحويل بين الصناديق لا يغير صافي نقد الفرع.',
  };
}
