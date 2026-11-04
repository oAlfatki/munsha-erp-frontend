import { HistoricalCostReport } from '@/features/inventory/components/reports/HistoricalCostReport';
/** مراجعة تكلفة الصنف التاريخية — feature-owned route content. */
export default function HistoricalInventoryCostPage() {
  return (
    <section className="screen-page" data-screen="inventory~historical-cost">
      <HistoricalCostReport />
    </section>
  );
}
