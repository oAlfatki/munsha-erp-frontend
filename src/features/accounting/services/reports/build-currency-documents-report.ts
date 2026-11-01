import type {BuildCurrencyDocumentsReportContext} from '@/features/accounting/types/read-models/BuildCurrencyDocumentsReportContext';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import { money } from '@/core/utils/money';
export function buildCurrencyDocumentsReport(
  workspace: BuildCurrencyDocumentsReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: [
        'عملة المستند',
        'عدد الفواتير النهائية',
        'إجمالي المبيعات بعملتها',
        'إجمالي المشتريات بعملتها',
        'القيمة الأساسية المجمعة',
      ],
      rows: workspace.currencies.map((c) => {
        const ds = workspace.invoices.filter(
          (invoice) =>
            invoice.currency === c.code &&
            invoice.branchId === branch &&
            invoice.status === 'final' &&
            within(invoice.date),
        );
        return [
          c.code,
          ds.length,
          money(
            ds
              .filter((invoice) => invoice.kind === 'sale')
              .reduce((n, invoice) => n + invoice.total, 0),
          ),
          money(
            ds
              .filter((invoice) => invoice.kind === 'purchase')
              .reduce((n, invoice) => n + invoice.total, 0),
          ),
          money(ds.reduce((n, invoice) => n + invoice.total * invoice.rate, 0)),
        ];
      }),
      note: 'تحليل مستندات بعملاتها، وليس أرصدة ذمم أجنبية أو إعادة تقييم. قيمة المبيعات والمشتريات لا تجمع كربح.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
