import { buildAssetDepreciationReport } from '@/features/accounting/services/reports/build-asset-depreciation-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
export function AssetDepreciationReport() {
  return (
    <ReportViewer
      title="تقرير الأصول والإهلاك"
      buildData={buildAssetDepreciationReport}
      summaryColumns={[1, 2, 3]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
    />
  );
}
