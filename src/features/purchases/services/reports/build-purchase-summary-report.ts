import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
import { extras } from '@/features/ledger/public/extensions';
import type { BuildPurchaseSummaryReportContext } from '@/features/purchases/types/read-models/BuildPurchaseSummaryReportContext';
import { tradeSummary } from '@/features/trade/public/trade-summary';
export function buildPurchaseSummaryReport(
  workspace: BuildPurchaseSummaryReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  return tradeSummary(workspace, 'purchase', branch, filters);
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
    const docs = workspace.invoices.filter(
      (invoice) =>
        invoice.kind === 'purchase' && invoice.branchId === branch && invoice.status === 'final',
    );
    const events = docs
      .flatMap((invoice) => {
        const original = {
          date: invoice.date,
          ref: invoice.number,
          d: invoice,
          value: invoice.total * invoice.rate,
          sign: 1,
        };
        const partial = (workspace.invoiceReturns || [])
          .filter((r) => r.sourceId === invoice.id)
          .map((r) => ({
            date: r.date,
            ref: r.number,
            d: r,
            value: r.total * r.rate * -1,
            sign: -1,
          }));
        const re = invoice.reversedBy
          ? workspace.entries.find((entry) => entry.reference === invoice.reversedBy)
          : undefined;
        return [
          original,
          ...(re
            ? [
                {
                  date: re.date,
                  ref: re.reference,
                  d: invoice,
                  value: -invoice.total * invoice.rate,
                  sign: -1,
                },
              ]
            : []),
          ...partial,
        ];
      })
      .filter((e) => within(e.date));
    reportData = {
      headers: [
        'التاريخ',
        'المستند',
        'الطرف',
        'عملة الأصل',
        'القيمة الأصلية',
        'سعر الصرف التاريخي',
        'القيمة YER',
      ],
      rows: events.map((e) => [
        e.date,
        e.ref,
        names(e.d.partyId) || 'نقدي',
        e.d.currency,
        money(e.d.total * e.sign),
        e.d.rate,
        money(e.value),
      ]),
      total: money(events.reduce((n, e) => n + e.value, 0)),
      note: 'المسودات مستبعدة. التقرير الصافي يسجل المرتجع بتاريخ مستند الرد، مع المحافظة على المعدل التاريخي.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
    if (reportData.total !== undefined)
      reportData.total = money(reportData.rows.reduce((n, row) => n + Number(row[6]), 0));
  }
  return reportData;
}
