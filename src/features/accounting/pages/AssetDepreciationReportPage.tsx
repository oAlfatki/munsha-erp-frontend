import { AssetDepreciationReport } from '@/features/accounting/components/reports/AssetDepreciationReport';
/** تقرير الأصول والإهلاك — feature-owned route content. */
export default function AssetDepreciationReportPage() {
  

  return (
    <section className="screen-page" data-screen="accounts~asset-report">
          <AssetDepreciationReport />
        </section>
  );
}
