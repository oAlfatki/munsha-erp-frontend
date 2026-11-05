import { StagnantStockReport } from '@/features/inventory/reports/components/StagnantStockReport';
/** الأصناف الراكدة — feature-owned route content. */
export default function StagnantInventoryPage() {
  return (
    <section className="screen-page" data-screen="inventory~stagnant">
      <StagnantStockReport />
    </section>
  );
}
