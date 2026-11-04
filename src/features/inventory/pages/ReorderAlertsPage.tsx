import { ReorderReport } from '@/features/inventory/components/reports/ReorderReport';
/** أصناف بلغت حد الطلب — feature-owned route content. */
export default function ReorderAlertsPage() {
  return (
    <section className="screen-page" data-screen="inventory~reorder">
      <ReorderReport />
    </section>
  );
}
