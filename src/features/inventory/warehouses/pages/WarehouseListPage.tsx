import { WarehouseDirectory } from '@/features/inventory/warehouses/components/screens/WarehouseDirectory';
/** قائمة المخازن — feature-owned route content. */
export default function WarehouseListPage() {
  return (
    <section className="screen-page" data-screen="inventory~warehouses">
      <WarehouseDirectory />
    </section>
  );
}
