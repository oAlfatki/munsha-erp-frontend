import type { Filters } from '@/core/types/api/Filters';
import type { ReportData } from '@/core/types/reports/ReportData';
import { money } from '@/core/utils/money';
import type { BuildAssetDepreciationReportContext } from '@/features/accounting/reports/types/read-models/BuildAssetDepreciationReportContext';
import { extras } from '@/features/ledger/public';
export function buildAssetDepreciationReport(
  workspace: BuildAssetDepreciationReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: [
        'الأصل',
        'تكلفة مثبتة',
        'مجمع الإهلاك',
        'القيمة الدفترية YER',
        'الجاهزية',
        'الحالة',
      ],
      rows: (extras(workspace).records.assets || [])
        .filter((a) => a.branchId === branch)
        .map((a) => {
          const purchase = extras(workspace).operations.find(
            (o) =>
              o.subject === a.id &&
              o.kind === 'assetPurchase' &&
              (!filters.to || o.date <= filters.to),
          );
          const dep = extras(workspace)
            .operations.filter(
              (o) =>
                o.subject === a.id &&
                o.kind === 'depreciation' &&
                (!filters.to || o.date <= filters.to),
            )
            .reduce((n, o) => n + o.amount, 0);
          return [
            a.name,
            purchase?.amount || 0,
            money(dep),
            money((purchase?.amount || 0) - dep),
            String(a.ready || ''),
            purchase ? 'مثبت' : 'بطاقة فقط',
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
