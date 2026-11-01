import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { AssetDepreciationReport } from '@/features/accounting/components/reports/AssetDepreciationReport';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
/** تقرير الأصول والإهلاك — feature-owned route content. */
export default function AssetDepreciationReportPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~asset-report">
          <AssetDepreciationReport />
        </section>
      }
    </FeatureDataScope>
  );
}
