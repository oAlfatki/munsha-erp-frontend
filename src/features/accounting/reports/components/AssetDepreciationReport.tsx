import { useAssetDepreciationReportView } from '@/features/accounting/reports/hooks/useAssetDepreciationReportView';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function AssetDepreciationReport() {
  const model = useAssetDepreciationReportView({
    title: 'تقرير الأصول والإهلاك',
    summaryColumns: [1, 2, 3],
  });

  return (
    <ReportViewer
      title="تقرير الأصول والإهلاك"
      model={model}
      summaryColumns={[1, 2, 3]}
      shouldShowFrom={false}
      isAsOf={true}
      shouldShowWarehouse={false}
    />
  );
}
