import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import type { BuildProfitByItemReportContext } from '@/features/financial/types/read-models/BuildProfitByItemReportContext';
import { extras } from '@/features/ledger/public/extensions';
import { lineTotal } from '@/features/trade/public/line-total';
export function buildProfitByItemReport(
  workspace: BuildProfitByItemReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  const names = (id: string) =>
    workspace.parties.find((party) => party.id === id)?.name ||
    workspace.employees.find((employee) => employee.id === id)?.name ||
    extras(workspace).records.assets?.find((a) => a.id === id)?.name ||
    workspace.products.find((product) => product.id === id)?.name ||
    id;
  let reportData: ReportData = { headers: [], rows: [] };
  {
    const totals = new Map<
      string,
      {
        sale: number;
        cost: number;
        qty: number;
      }
    >();
    for (const invoice of workspace.invoices.filter(
      (invoice) =>
        invoice.kind === 'sale' && invoice.status === 'final' && invoice.branchId === branch,
    )) {
      const re = invoice.reversedBy
        ? workspace.entries.find((entry) => entry.reference === invoice.reversedBy)
        : undefined;
      for (const e of [
        { date: invoice.date, sign: 1, lines: invoice.lines },
        ...(re ? [{ date: re.date, sign: -1, lines: invoice.lines }] : []),
        ...(workspace.invoiceReturns || [])
          .filter((r) => r.sourceId === invoice.id)
          .map((r) => ({ date: r.date, sign: -1, lines: r.lines })),
      ].filter((e) => within(e.date)))
        for (const invoiceLine of e.lines) {
          const id = invoiceLine.productId;
          const old = totals.get(id) || { sale: 0, cost: 0, qty: 0 };
          old.sale += lineTotal(invoiceLine) * invoice.rate * e.sign;
          old.cost += invoiceLine.cost * e.sign;
          old.qty +=
            invoiceLine.qty *
            workspace.products.find((product) => product.id === invoiceLine.productId)!.units[
              invoiceLine.unit
            ].factor *
            e.sign;
          totals.set(id, old);
        }
    }
    reportData = {
      headers: [
        'الصنف',
        'كمية أساسية صافية',
        'صافي المبيعات YER',
        'تكلفة المبيعات',
        'مجمل الربح',
        'هامش %',
      ],
      rows: [...totals].map(([id, t]) => [
        names(id),
        t.qty,
        money(t.sale),
        money(t.cost),
        money(t.sale - t.cost),
        t.sale ? money(((t.sale - t.cost) / t.sale) * 100) : 0,
      ]),
      total: money([...totals.values()].reduce((n, t) => n + t.sale - t.cost, 0)),
      note: 'مجمل الربح بعد تكلفة البضاعة والمرتجعات؛ لا يخصم المصروفات التشغيلية.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
    if (reportData.total !== undefined)
      reportData.total = money(reportData.rows.reduce((n, row) => n + Number(row[4]), 0));
  }
  return reportData;
}
